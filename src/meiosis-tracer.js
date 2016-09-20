import { initialModel } from "./model";
import { initialView, proposalView } from "./view";
import receive from "./receive";

const tracerModel = initialModel;

const meiosisTracer = (createComponent, renderRoot, selector, viewProxy) => {
  const receiver = receive(tracerModel, viewProxy || proposalView);
  createComponent({
    receive: receiver
  });
  initialView(selector, renderRoot, tracerModel);
  receiver(renderRoot.initialModel, "initialModel");
};

export { meiosisTracer };
