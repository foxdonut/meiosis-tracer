import { initialModel } from "./model";
import { initialView, proposalView } from "./view";
import receive from "./receive";

const tracerModel = initialModel;

const meiosisTracer = (createComponent, renderRoot, selector) => {
  const receiver = receive(tracerModel, proposalView);
  createComponent({
    receive: receiver
  });
  initialView(selector, renderRoot, tracerModel);
  receiver(renderRoot.initialModel, "initialModel");
};

export { meiosisTracer };
