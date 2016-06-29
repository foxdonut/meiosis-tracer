import { initialModel } from "./model";
import { initialView, proposalView } from "./view";
import receive from "./receive";

const tracerModel = initialModel;

const meiosisTracer = (createComponent, renderRoot, selector) => {
  createComponent({
    receive: receive(tracerModel, proposalView)
  });
  initialView(selector, renderRoot, tracerModel);
};

export { meiosisTracer };
