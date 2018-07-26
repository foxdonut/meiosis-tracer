import { createStates } from "../src/state"

const states = createStates(2)

const models = [
  "{\"counter\": 0}",
  "{\"counter\": 1}"
]

const value = 2

export default {
  state: {
    initial_0: {
      history: [
        states[0].history.length,
        0
      ],
      value: [
        states[0].value,
        0
      ]
    },
    initial_1: {
      history: [
        states[1].history.length,
        0
      ],
      value: [
        states[1].value,
        0
      ]
    },
    addHistory: {
      length: [
        (states[0].history.push(models[0]), states[0].history.length),
        1
      ],
      model: [
        states[0].history[0],
        models[0]
      ]
    },
    setValue: [
      (states[1].value = value, states[1].value),
      value
    ]
  }
}
