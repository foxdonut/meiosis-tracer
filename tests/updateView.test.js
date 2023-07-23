/* eslint-env jest */

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

describe('updateView', () => {
  it('model', () => {
    expect(getElement(C.modelId(index)).value).toEqual(model);
  });

  it('sliderValue', () => {
    expect(getElement(C.sliderId(index)).value).toEqual(String(value));
  });

  it('sliderMax', () => {
    expect(getElement(C.sliderId(index)).max).toEqual(String(max));
  });

  it('sliderValueLabel', () => {
    expect(getElement(C.sliderValueId(index)).textContent).toEqual(String(value));
  });
});
