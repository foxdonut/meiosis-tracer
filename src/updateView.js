import * as C from './constants';

export const updateView = ({ index, model, value, max }) => {
  document.getElementById(C.modelId(index)).value = model;

  if (max != null) {
    document.getElementById(C.sliderId(index)).max = max;
  }

  document.getElementById(C.sliderId(index)).value = value;
  document.getElementById(C.sliderValueId(index)).innerHTML = value;

  document.getElementById(C.stepBackId(index)).disabled = value <= 0;
  document.getElementById(C.stepForwardId(index)).disabled =
    value == document.getElementById(C.sliderId(index)).max;
};
