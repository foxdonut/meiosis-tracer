import { initialModel } from "./model";
import { initialView, updateView } from "./view";
import receiveUpdate from "./receiveUpdate";

const tracerModel = initialModel;

const meiosisTracer = (createComponent, renderRoot, selector) => {
  createComponent({
    receiveUpdate: receiveUpdate(tracerModel, updateView)
  });
  initialView(selector, renderRoot, tracerModel);
};

export { meiosisTracer };
