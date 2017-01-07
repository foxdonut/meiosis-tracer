import { tracerModel } from "./model";
import { initialView, tracerView, reset } from "./view";
import { createReceiveValues } from "./receive";

const meiosisTracer = ({ selector, renderModel, horizontal }) => {
  const receiveValues = createReceiveValues(tracerModel, tracerView);
  renderModel = renderModel || (model => {
    window.postMessage({ type: "MEIOSIS_RENDER_MODEL", model }, "*");
  });
  initialView(selector, tracerModel, renderModel, horizontal);

  window.addEventListener("message", evt => {
    if (evt.data.type === "MEIOSIS_VALUES") {
      receiveValues(evt.data.values, evt.data.update);
    }
  });

  window.postMessage({ type: "MEIOSIS_TRACER_INIT" }, "*");

  return {
    receiveValues,
    reset: () => reset(tracerModel)
  };
};

export { meiosisTracer };
