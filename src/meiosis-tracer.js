import { initialModel } from "./model";
import { initialView, proposalView, reset, setStateFn } from "./view";
import receive from "./receive";

const tracerModel = initialModel;

const meiosisTracer = ({ selector, initialModel, render, horizontal }) => {
  const receiver = receive(tracerModel, proposalView(render));
  const component = { receive: receiver };
  initialView(selector, render, tracerModel, horizontal);
  receiver(initialModel, "initialModel");

  return {
    component,
    reset: () => reset(render, tracerModel),
    setStateFn
  };
};

export { meiosisTracer };
