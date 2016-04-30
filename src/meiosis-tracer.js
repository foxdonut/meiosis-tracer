import { initialModel } from "./model";
import view from "./view";
import receiveUpdate from "./receiveUpdate";

const tracerModel = initialModel;

const meiosisTracer = (createComponent, renderRoot, elementId) => createComponent({
  receiveUpdate: receiveUpdate(tracerModel, view(elementId, renderRoot))
});

export { meiosisTracer };
