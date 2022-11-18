import { setup, getElement } from './setup';
import { streamView } from '../src/streamView';
import { updateView } from '../src/updateView';
import * as C from '../src/constants';

const element = setup();
const index = 0;

const listeners = {
  onSliderChange: () => null,
  onStepBack: () => null,
  onStepForward: () => null,
  onSend: () => null
};

streamView({ element, index, listeners });

const model = '{"updated": true }';
const value = 1;
const max = 2;

updateView({ index, model, value, max });

export default {
  updateView: {
    model: [getElement(C.modelId(index)).value, model],
    sliderValue: [getElement(C.sliderId(index)).value, String(value)],
    sliderMax: [getElement(C.sliderId(index)).max, String(max)],
    sliderValueLabel: [getElement(C.sliderValueId(index)).textContent, String(value)]
  }
};
