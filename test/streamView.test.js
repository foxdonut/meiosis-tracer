import { setup, getElement, triggerEvent } from "./setup"
import { streamView } from "../src/streamView"
import * as C from "../src/constants"

const element = setup()
const index = 0

const receivedValues = {
  sliderChange: null,
  stepBack: null,
  stepForward: null,
  send: null
}

const listeners = {
  onSliderChange: index => { receivedValues.sliderChange = index },
  onStepBack: () => { receivedValues.stepBack = true },
  onStepForward: () => { receivedValues.stepForward = true },
  onSend: model => { receivedValues.send = model }
}

streamView({ element, index, listeners })

const sliderValue = 5
const modelValue = "{ }"

getElement(C.sliderId(index)).value = sliderValue
getElement(C.modelId(index)).value = modelValue

triggerEvent(getElement(C.sliderId(index)), "input")
triggerEvent(getElement(C.stepBackId(index)), "click")
triggerEvent(getElement(C.stepForwardId(index)), "click")
triggerEvent(getElement(C.sendId(index)), "click")

export default {
  streamView: {
    basic: {
      streamBox: [
        getElement(C.streamId(index)).id,
        C.streamId(index)
      ],
      model: [
        getElement(C.modelId(index)).type,
        "textarea"
      ],
      slider: [
        getElement(C.sliderId(index)).type,
        "range"
      ],
      stepBack: [
        getElement(C.stepBackId(index)).textContent,
        "<"
      ],
      stepForward: [
        getElement(C.stepForwardId(index)).textContent,
        ">"
      ],
      index: [
        getElement(C.sliderValueId(index)).textContent,
        "-1"
      ],
      send: [
        getElement(C.sendId(index)).textContent,
        "Send"
      ]
    },
    events: {
      onSliderChange: [ receivedValues.sliderChange, sliderValue ],
      onStepBack: [ receivedValues.stepBack, true ],
      onStepForward: [ receivedValues.stepForward, true ],
      onSend: [ receivedValues.send, modelValue ]
    }
  }
}
