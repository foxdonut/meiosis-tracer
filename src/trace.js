const isMeiosisTracerOn = () => (window && window["__MEIOSIS_TRACER_GLOBAL_HOOK__"])

/*
Changes to a stream are sent to the tracer.

Stream values received from the tracer are pushed onto the stream.

They are either sent back or not according to the flag issued by the tracer:
- When auto-sent using the slider, do not send values back.
- When sent using the Send button, send values back; they can either be added
  to the history or not, according to a checkbox.

Messages:

- MEIOSIS_TRACER_INIT: received from the UI to initialize
- MEIOSIS_PING: sent to the UI in case we missed the INIT message, asks the UI to send INIT
- MEIOSIS_STREAM_LABELS: sent to the UI to initialize number of streams and labels
- MEIOSIS_STREAM_VALUE: sent to the UI to indicate a new stream value
- MEIOSIS_TRIGGER_STREAM_VALUE: received from the UI to push a value onto a stream

Parameters:

- streams:              [ ]      // each item either a stream, or { label, stream }
- stringify (optional): Function // default is obj => JSON.stringify(obj, null, 4)
- parse (optional):     Function // default is str => JSON.parse(str)
*/
export const trace = ({
  streams = [],
  stringify = obj => JSON.stringify(obj, null, 4),
  parse = str => JSON.parse(str)
}) => {
  if (!isMeiosisTracerOn()) {
    return
  }
  const bufferedStreamValues = []
  let devtoolInitialized = false
  let lastIndex = -1

  const streamObjs = []
  const labels = []

  for (let i = 0, t = streams.length; i < t; i++) {
    if (streams[i].label) {
      labels.push(streams[i].label)
      streamObjs.push(streams[i])
    }
    else {
      const label = "Stream " + i
      labels.push(label)
      streamObjs.push({ stream: streams[i], label })
    }
  }

  streamObjs.forEach(({ stream }, index) => {
    stream.map(value => {
      if (lastIndex !== index) {
        const data = { type: "MEIOSIS_STREAM_VALUE", index, value: stringify(value) }

        if (devtoolInitialized) {
          window.postMessage(data, "*")
        }
        else {
          bufferedStreamValues.push(data)
        }
      }
    })
  })

  window.addEventListener("message", evt => {
    if (evt.data.type === "MEIOSIS_TRACER_INIT") {
      window.postMessage({ type: "MEIOSIS_STREAM_LABELS", value: labels }, "*")
      devtoolInitialized = true
      bufferedStreamValues.forEach(data => window.postMessage(data, "*"))
      bufferedStreamValues.length = 0
    }
    else if (evt.data.type === "MEIOSIS_TRIGGER_STREAM_VALUE") {
      const { index, value } = evt.data
      lastIndex = index
      streamObjs[index].stream(parse(value))
      lastIndex = -1
    }
  })

  // Send ping in case tracer was already loaded and we missed the MEIOSIS_TRACER_INIT message.
  window.postMessage({ type: "MEIOSIS_PING" }, "*")
}
