import { initialModel } from "./model";
import { initialView, updateView } from "./view";
import receiveUpdate from "./receiveUpdate";

const tracerModel = initialModel;

const meiosisTracer = (createComponent, renderRoot, selector) => createComponent({
  ready: initialView(selector, renderRoot),
  receiveUpdate: receiveUpdate(tracerModel, updateView(selector, renderRoot))
});

export { meiosisTracer };
