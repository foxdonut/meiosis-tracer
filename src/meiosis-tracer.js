import { initialModel } from "./model";
import view from "./view";
import receivers from "./receivers";

const meiosisTracer = (createComponent, elementId) => createComponent({
  initialModel,
  view: view(elementId),
  receivers
});

export { meiosisTracer };
