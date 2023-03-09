import { streamView } from './streamView';
import { updateView } from './updateView';
import { settingsView, initializeResizeChangeDirection } from './settingsView';
import * as C from './constants';

window['__MEIOSIS_TRACER_GLOBAL_HOOK__'] = true;
const states = [];
const accumulateHistory = [];

export const tracer = ({
  selector,
  sendTracerInit,
  triggerStreamValue,
  theme = 'light',
  direction = 'column',
  rows = 15,
  cols = 50,
  autoSend = true
}) => {
  const target = document.querySelector(selector);

  if (!target) {
    return;
  }

  target.classList.add(`theme-${theme}`);

  let containerStyle = null;

  if (sendTracerInit == null) {
    sendTracerInit = () => {
      window.postMessage({ type: 'MEIOSIS_TRACER_INIT' }, '*');
    };
  }

  if (triggerStreamValue == null) {
    triggerStreamValue = (index, value) => {
      window.postMessage({ type: 'MEIOSIS_TRIGGER_STREAM_VALUE', index, value }, '*');
    };
  }

  // const receiveStreamOptions = ({ streamOptions, direction, rows, cols, autoSend }) => {
  const receiveStreamOptions = (streamOptions) => {
    if (target.lastChild) {
      return;
    }
    const settingsListeners = {
      onHideTracer: () => {
        const container = document.getElementById(C.streamContainerId);
        containerStyle = container.style;
        container.style = 'display:none';

        document.getElementById(C.settingsContainerId).style = 'display:none';
        document.getElementById(C.showTracerId).style = '';
      },
      onShowTracer: () => {
        document.getElementById(C.streamContainerId).style = containerStyle;

        document.getElementById(C.settingsContainerId).style = '';
        document.getElementById(C.showTracerId).style = 'display:none';
      },
      onRowsColsChange: (rows, cols) => {
        for (let i = 0; i < streamOptions.length; i++) {
          const textarea = document.getElementById(C.modelId(i));
          textarea.rows = rows;
          textarea.cols = cols;
        }
      },
      onDirectionChange: (direction) => {
        document.getElementById(C.streamContainerId).style =
          'display:flex;flex-direction:' + direction;
      },
      onAutoChange: (auto) => {
        autoSend = auto;
      }
    };
    const settings = document.createElement('div');
    target.append(settings);
    settingsView({
      element: settings,
      listeners: settingsListeners,
      direction,
      rows,
      cols,
      autoSend
    });

    const container = document.createElement('div');
    container.id = C.streamContainerId;
    container.style = 'display:flex;flex-direction:column';
    target.append(container);

    const sendStreamValue = (index, model) => {
      if (autoSend) {
        accumulateHistory[index] = false;
        document.getElementById(C.histId(index)).checked = false;
        triggerStreamValue(index, model);
      }
    };

    for (let index = 0; index < streamOptions.length; index++) {
      const { label, hist, hide } = streamOptions[index];
      states.push({ history: [], value: -1 });
      accumulateHistory.push(hist === false ? false : true);

      const listeners = {
        onSliderChange: (value) => {
          const state = states[index];
          const model = state.history[value];
          state.value = value;

          updateView({ index, model, value });
          sendStreamValue(index, model);
        },
        onStepBack: () => {
          const state = states[index];
          state.value = state.value - 1;
          const model = state.history[state.value];

          updateView({ index, model, value: state.value });
          sendStreamValue(index, model);
        },
        onStepForward: () => {
          const state = states[index];
          state.value = state.value + 1;
          const model = state.history[state.value];

          updateView({ index, model, value: state.value });
          sendStreamValue(index, model);
        },
        onSend: (value) => {
          triggerStreamValue(index, value);
        },
        onReset: () => {
          const state = states[index];
          state.history.length = 0;
          state.value = -1;

          updateView({ index, model: '', value: state.value, max: state.value });
        },
        onHistChange: (index, hist) => {
          accumulateHistory[index] = hist;
        }
      };

      const element = document.createElement('div');
      element.style = 'flex-grow:1';
      container.append(element);

      streamView({ element, index, listeners, label, rows, cols, hist, hide });
    }

    initializeResizeChangeDirection(settingsListeners, direction);
  };

  const receiveStreamValue = (index, model) => {
    if (accumulateHistory[index]) {
      const state = states[index];

      if (state.history.length > 0) {
        state.history.length = state.value + 1;
      }
      state.history.push(model);
      state.value = state.history.length - 1;

      updateView({ index, model, value: state.value, max: state.history.length - 1 });
    }
  };

  window.addEventListener('message', (evt) => {
    if (evt.data.type === 'MEIOSIS_STREAM_OPTIONS') {
      receiveStreamOptions(evt.data.value);
    } else if (evt.data.type === 'MEIOSIS_STREAM_VALUE') {
      receiveStreamValue(evt.data.index, evt.data.value);
    }
  });

  sendTracerInit();

  return {
    receiveStreamOptions,
    receiveStreamValue
  };
};
