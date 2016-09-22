import { initialModel } from "./model";
import { initialView, proposalView } from "./view";
import receive from "./receive";

const tracerModel = initialModel;

const meiosisTracer = (createComponent, renderRoot, selector, horizontal) => {
  const receiver = receive(tracerModel, proposalView);
  createComponent({
    receive: receiver
  });
  initialView(selector, renderRoot, tracerModel, horizontal);
  receiver(renderRoot.initialModel, "initialModel");
};

export { meiosisTracer };
