import { setup, triggerEvent } from "./setup"
import { initialView } from "../src/initialView"
import { eventListeners } from "../src/eventListeners"
import * as C from "../src/constants"

const element = setup()
const tracerModel = { tracerStates: [ {} ], tracerIndex: 0 }
element.innerHTML = initialView({ tracerModel })

const flags = {
  onToggleTracer: false,
  onReset: false,
  onSliderChange: false,
  onRefresh: false,
  onStepBack: false,
  onStepForward: false,
  onToggleAccumulateHistory: false
}

const listeners = {
  onToggleTracer: () => { flags.onToggleTracer = true },
  onReset: () => { flags.onReset = true },
  onSliderChange: () => { flags.onSliderChange = true },
  onRefresh: () => { flags.onRefresh = true },
  onStepBack: () => { flags.onStepBack = true },
  onStepForward: () => { flags.onStepForward = true },
  onToggleAccumulateHistory: () => { flags.onToggleAccumulateHistory = true }
}

eventListeners(listeners)

triggerEvent(document.getElementById(C.tracerToggleId), "click")
triggerEvent(document.getElementById(C.tracerResetId), "click")
triggerEvent(document.getElementById(C.tracerId), "input")
triggerEvent(document.getElementById(C.tracerRefreshViewId), "click")
triggerEvent(document.getElementById(C.tracerStepBackId), "click")
triggerEvent(document.getElementById(C.tracerStepForwardId), "click")
triggerEvent(document.getElementById(C.tracerAccumulHistoryId), "change")

export default {
  eventListeners: {
    onToggleTracer: [ flags.onToggleTracer, true ],
    onReset: [ flags.onReset, true ],
    onSliderChange: [ flags.onSliderChange, true ],
    onRefresh: [ flags.onRefresh, true ],
    onStepBack: [ flags.onStepBack, true ],
    onStepForward: [ flags.onStepForward, true ],
    onToggleAccumulateHistory: [ flags.onToggleAccumulateHistory, true ]
  }
}
