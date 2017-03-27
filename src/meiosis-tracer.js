import { tracerModel } from "./model";
import { initialView, tracerView, initStreamIds, updateStreamValue, reset } from "./view";
import { createReceiveValues } from "./receive";

window["__MEIOSIS_TRACER_GLOBAL_HOOK__"] = true;

const meiosisTracer = ({ selector, renderModel, horizontal }) => {
  const receiveValues = createReceiveValues(tracerModel, tracerView);

  renderModel = renderModel || ((model, sendValuesBack) =>
    window.postMessage({ type: "MEIOSIS_RENDER_MODEL", model, sendValuesBack }, "*"));

  initialView(selector, tracerModel, renderModel, horizontal);

  const triggerStreamValue = (streamId, value) =>
    window.postMessage({ type: "MEIOSIS_TRIGGER_STREAM_VALUE", streamId, value }, "*");

  window.addEventListener("message", evt => {
    if (evt.data.type === "MEIOSIS_VALUES") {
      receiveValues(evt.data.values, evt.data.update);
    }
    else if (evt.data.type === "MEIOSIS_STREAM_IDS") {
      const streamIds = evt.data.streamIds;

      streamIds.forEach(streamId =>
        tracerModel.streams[streamId] = { index: 0, values: [] }
      );
      initStreamIds(streamIds, tracerModel.streams, triggerStreamValue);
    }
    else if (evt.data.type === "MEIOSIS_STREAM_VALUE") {
      const streamId = evt.data.streamId;
      const streamState = tracerModel.streams[streamId];

      streamState.values.push(evt.data.value);
      streamState.index = streamState.values.length - 1;

      updateStreamValue(streamId, streamState);
    }
  });

  window.postMessage({ type: "MEIOSIS_TRACER_INIT" }, "*");

  return {
    receiveValues,
    reset: () => reset(tracerModel)
  };
};

export { meiosisTracer };
