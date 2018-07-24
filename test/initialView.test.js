import { setup, getElement, getText } from "./setup"
import { initialView } from "../src/initialView"
import * as C from "../src/constants"

const element = setup()
const tracerModel = { tracerStates: [ {} ], tracerIndex: 0 }
element.innerHTML = initialView({ tracerModel })

const tracer = getElement(C.tracerId)

export default {
  initialView: {
    basic: {
      hideButton: [
        getText(C.tracerToggleId),
        "Hide"
      ],
      resetButton: [
        getText(C.tracerResetId),
        "Reset"
      ],
      tracer: [
        { type: tracer.type,
          min: tracer.min,
          max: tracer.max,
          value: tracer.value
        },
        { type: "range",
          min: "0",
          max: "0",
          value: "0"
        }
      ],
      stepBack: [
        getText(C.tracerStepBackId),
        "<"
      ],
      stepForward: [
        getText(C.tracerStepForwardId),
        ">"
      ],
      index: [
        getText(C.tracerIndexId),
        "0"
      ],
      accumulateHistory: [
        { type: getElement(C.tracerAccumulHistoryId).type,
          checked: getElement(C.tracerAccumulHistoryId).checked
        },
        { type: "checkbox",
          checked: true
        }
      ],
      refresh: [
        getText(C.tracerRefreshViewId),
        "Refresh view"
      ],
      model: [
        getElement(C.tracerModelId).type,
        "textarea"
      ],
      errorMessage: [
        getElement(C.errorMessageId).style.display,
        "none"
      ]
    }
  }
}
