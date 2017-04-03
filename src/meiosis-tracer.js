import { tracerModel } from "./model";
import { initialView, tracerView, initStreamIds, updateStreamValue, reset } from "./view";
import { createReceiveValues } from "./receive";

window["__MEIOSIS_TRACER_GLOBAL_HOOK__"] = true;

const meiosisTracer = ({ selector, renderModel, triggerStreamValue, horizontal }) => {
  const receiveValues = createReceiveValues(tracerModel, tracerView);

  renderModel = renderModel || ((model, sendValuesBack) =>
    window.postMessage({ type: "MEIOSIS_RENDER_MODEL", model, sendValuesBack }, "*"));

  initialView(selector, tracerModel, renderModel, horizontal);

  triggerStreamValue = triggerStreamValue || ((streamId, value) =>
    window.postMessage({ type: "MEIOSIS_TRIGGER_STREAM_VALUE", streamId, value }, "*"));

  const initStreamIdModel = (streamIds) => {
    streamIds.forEach(streamId =>
      tracerModel.streams[streamId] = { index: 0, values: [] }
    );
    initStreamIds(streamIds, tracerModel.streams, triggerStreamValue);
  };

  const receiveStreamValue = (streamId, value) => {
    const streamState = tracerModel.streams[streamId];

    streamState.values.push(value);
    streamState.index = streamState.values.length - 1;

    updateStreamValue(streamId, streamState);
  };

  window.addEventListener("message", evt => {
    if (evt.data.type === "MEIOSIS_VALUES") {
      receiveValues(evt.data.values, evt.data.update);
    }
    else if (evt.data.type === "MEIOSIS_STREAM_IDS") {
      const streamIds = evt.data.streamIds;
      initStreamIdModel(streamIds);
    }
    else if (evt.data.type === "MEIOSIS_STREAM_VALUE") {
      receiveStreamValue(evt.data.streamId, evt.data.value);
    }
  });

  window.postMessage({ type: "MEIOSIS_TRACER_INIT" }, "*");

  return {
    receiveValues,
    initStreamIdModel,
    receiveStreamValue,
    reset: () => reset(tracerModel)
  };
};

export { meiosisTracer };
