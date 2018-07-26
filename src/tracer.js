import { streamView } from "./streamView"
import { updateView } from "./updateView"
import { settingsView } from "./settingsView"
import * as C from "./constants"

window["__MEIOSIS_TRACER_GLOBAL_HOOK__"] = true

export const tracer = ({
  selector = "#tracer",
  rows = 5,
  cols = 40
}) => {
  const target = document.querySelector(selector)

  if (!target) {
    return
  }

  const states = []

  window.addEventListener("message", evt => {
    if (evt.data.type === "MEIOSIS_STREAM_LABELS") {
      const labels = evt.data.value

      const settingsListeners = {
        onRowsColsChange: (rows, cols) => {
          for (let i = 0; i < labels.length; i++) {
            const textarea = document.getElementById(C.modelId(i))
            textarea.rows = rows
            textarea.cols = cols
          }
        }
      }
      const settings = document.createElement("div")
      target.append(settings)
      settingsView({ element: settings, listeners: settingsListeners, rows, cols })

      for (let index = 0; index < labels.length; index++) {
        states.push({ history: [], value: -1 })

        const listeners = {
          onSliderChange: value => {
            const state = states[index]
            const model = state.history[value]
            state.value = value

            updateView({ index, model, value })
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
            window.postMessage({ type: "MEIOSIS_TRIGGER_STREAM_VALUE", index, value }, "*")
          }
        }

        const element = document.createElement("div")
        target.append(element)
        const label = labels[index]

        streamView({ element, index, listeners, label, rows, cols })
      }
    }
    else if (evt.data.type === "MEIOSIS_STREAM_VALUE") {
      const index = evt.data.index
      const state = states[index]
      const model = evt.data.value

      state.history.push(model)
      state.value = state.value + 1

      updateView({ index, model, value: state.value, max: state.history.length - 1 })
    }
    /*
    else if (evt.data.type === "MEIOSIS_STREAM_IDS") {
      const streamIds = evt.data.streamIds
      initStreamIdModel(streamIds)
    }
    */
  })

  window.postMessage({ type: "MEIOSIS_TRACER_INIT" }, "*")
}
