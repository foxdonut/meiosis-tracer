import { setup } from "./setup"
import { trace } from "../src/trace"
import flyd from "flyd"

setup()

const streams = [flyd.stream(), flyd.stream()]

const values = [{ test: 0 }, { test: 1 }]

const received = []

window["__MEIOSIS_TRACER_GLOBAL_HOOK__"] = true

window.addEventListener("message", evt => {
  received.push(evt)
})

const post = msg => {
  window.postMessage(msg, "*")
}

// Stream value before init
streams[0](values[0])

trace({ streams })

// Stream value after init
streams[0](values[1])

post({ type: "MEIOSIS_TRIGGER_STREAM_VALUE", index: 1, value: values[1] })

export default {
  trace: {
    /*
    ping: [
      received[0].type,
      "MEIOSIS_PING"
    ]
    */
  }
}
