/* eslint-env jest */

import { setup, getElement, triggerEvent } from './setup';
import { streamView } from '../src/streamView';
import * as C from '../src/constants';

const element = setup();
const index = 0;

const receivedValues = {
  sliderChange: null,
  stepBack: null,
  stepForward: null,
  send: null
};

const listeners = {
  onSliderChange: (index) => {
    receivedValues.sliderChange = index;
  },
  onStepBack: () => {
    receivedValues.stepBack = true;
  },
  onStepForward: () => {
    receivedValues.stepForward = true;
  },
  onSend: (model) => {
    receivedValues.send = model;
  }
};

streamView({ element, index, listeners });

const sliderValue = 5;
const modelValue = '{ }';

getElement(C.sliderId(index)).value = sliderValue;
getElement(C.modelId(index)).value = modelValue;

triggerEvent(getElement(C.sliderId(index)), 'input');
triggerEvent(getElement(C.stepBackId(index)), 'click');
triggerEvent(getElement(C.stepForwardId(index)), 'click');
triggerEvent(getElement(C.sendId(index)), 'click');

describe('streamView', () => {
    describe('basic', () => {
      it('streamBox', () => {
        expect(getElement(C.streamId(index)).id).toEqual(C.streamId(index));
      });

      it('model', () => {
        expect(getElement(C.modelId(index)).type).toEqual('textarea');
      });

      it('slider', () => {
        expect(getElement(C.sliderId(index)).type).toEqual('range');
      });

      it('stepBack', () => {
        expect(getElement(C.stepBackId(index)).textContent).toEqual('<');
      });

      it('stepForward', () => {
        expect(getElement(C.stepForwardId(index)).textContent).toEqual('>');
      });

      it('index', () => {
        expect(getElement(C.sliderValueId(index)).textContent).toEqual('-1');
      });

      it('send', () => {
        expect(getElement(C.sendId(index)).textContent).toEqual('Send');
      });
    });

    describe('events', () => {
      it('onSliderChange', () => {
        expect(receivedValues.sliderChange).toEqual(sliderValue);
      });

      it('onStepBack', () => {
        expect(receivedValues.stepBack).toEqual(true);
      });

      it('onStepForward', () => {
        expect(receivedValues.stepForward).toEqual(true);
      });

      it('onSend', () => {
        expect(receivedValues.send).toEqual(modelValue);
      });
    });
});
