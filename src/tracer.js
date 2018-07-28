import { streamView } from "./streamView"
import { updateView } from "./updateView"
import { settingsView } from "./settingsView"
import * as C from "./constants"

window["__MEIOSIS_TRACER_GLOBAL_HOOK__"] = true

export const tracer = ({
  selector,
  sendTracerInit,
  triggerStreamValue,
  rows = 5,
  cols = 40
}) => {
  const target = document.querySelector(selector)

  if (!target) {
    return
  }

  const states = []
  let autoSend = true
  let accumulateHistory = true

  if (sendTracerInit == null) {
    sendTracerInit = () => {
      window.postMessage({ type: "MEIOSIS_TRACER_INIT" }, "*")
    }
  }

  if (triggerStreamValue == null) {
    triggerStreamValue = (index, value) => {
      window.postMessage({ type: "MEIOSIS_TRIGGER_STREAM_VALUE", index, value }, "*")
    }
  }

  const receiveLabels = labels => {
    const settingsListeners = {
      onRowsColsChange: (rows, cols) => {
        for (let i = 0; i < labels.length; i++) {
          const textarea = document.getElementById(C.modelId(i))
          textarea.rows = rows
          textarea.cols = cols
        }
      },
      onOrientChange: orient => {
        document.getElementById(C.streamContainerId).style = "display:flex;flex-direction:" + orient
      },
      onAutoChange: auto => {
        autoSend = auto
      },
      onHistChange: hist => {
        accumulateHistory = hist
      }
    }
    const settings = document.createElement("div")
    target.append(settings)
    settingsView({ element: settings, listeners: settingsListeners, rows, cols })

    const container = document.createElement("div")
    container.id = C.streamContainerId
    container.style="display:flex;flex-direction:column"
    target.append(container)

    for (let index = 0; index < labels.length; index++) {
      states.push({ history: [], value: -1 })

      const listeners = {
        onSliderChange: value => {
          const state = states[index]
          const model = state.history[value]
          state.value = value

          updateView({ index, model, value })

          if (autoSend) {
            accumulateHistory = false
            document.getElementById(C.histId).checked = false
            triggerStreamValue(index, model)
          }
        },
        onStepBack: () => {
          const state = states[index]
          state.value = state.value - 1
          const model = state.history[state.value]

          updateView({ index, model, value: state.value })
        },
        onStepForward: () => {
          const state = states[index]
          state.value = state.value + 1
          const model = state.history[state.value]

          updateView({ index, model, value: state.value })
        },
        onSend: value => {
          triggerStreamValue(index, value)
        }
      }

      const element = document.createElement("div")
      element.style="flex-grow:1"
      container.append(element)
      const label = labels[index]

      streamView({ element, index, listeners, label, rows, cols })
    }
  }

  const receiveStreamValue = (index, model) => {
    if (accumulateHistory) {
      const state = states[index]

      if (state.history.length > 0) {
        state.history.length = state.value + 1
      }
      state.history.push(model)
      state.value = state.history.length - 1

      updateView({ index, model, value: state.value, max: state.history.length - 1 })
    }
  }

  const reset = () => null

  window.addEventListener("message", evt => {
    if (evt.data.type === "MEIOSIS_STREAM_LABELS") {
      receiveLabels(evt.data.value)
    }
    else if (evt.data.type === "MEIOSIS_STREAM_VALUE") {
      receiveStreamValue(evt.data.index, evt.data.value)
    }
  })

  sendTracerInit()

  return {
    receiveLabels,
    receiveStreamValue,
    reset
  }
}
