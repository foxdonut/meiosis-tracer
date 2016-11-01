import { initialModel } from "./model";
import { initialView, proposalView, reset } from "./view";
import receive from "./receive";

const tracerModel = initialModel;

const meiosisTracer = (createComponent, renderRoot, selector, horizontal) => {
  const receiver = receive(tracerModel, proposalView(renderRoot));
  createComponent({ receive: receiver });
  initialView(selector, renderRoot, tracerModel, horizontal);
  receiver(renderRoot.initialModel, "initialModel");

  return { reset: () => reset(renderRoot, tracerModel) };
};

export { meiosisTracer };
