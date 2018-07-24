import { tracerModel } from "./model"
import { initialView, createTracerView, initStreamIds, updateStreamValue, reset } from "./view"
import { createReceiveValues } from "./receive"

window["__MEIOSIS_TRACER_GLOBAL_HOOK__"] = true

function isMeiosisTracerOn() {
  return window && window["__MEIOSIS_TRACER_GLOBAL_HOOK__"]
}

/*
  update: Stream<any>
  dataStreams: Array<Stream<any>>
  otherStreams?: Array<Stream<any>>
  toJS?: Function
  fromJS?: Function
  toUpdate?: Function
*/
function trace(params) {
  if (!params.update || !params.dataStreams) {
    throw new Error("Please specify update and dataStreams.")
  }

  /*
  Any change to lastStream automatically re-renders the view.

  "Live" changes are changes to the update stream.

  Keep track of the date of the last live change with the liveChange date.

  1. Live change
  - update the liveChange date
  - since liveChange !== lastChange, update=true
  - set lastChange = liveChange
  - send values to tracer with update=true. This will add to the tracer's history
    and increase the slider max.

  2. Time-travel change
  - receive MEIOSIS_RENDER_MODEL with sendValuesBack=false
  - send the data to the first stream, which then goes thru all streams
  - the view automatically re-renders
  - since liveChange === lastChange, update=false
  - don't send anything back to the tracer.

  3. Typing in model textarea
  - receive MEIOSIS_RENDER_MODEL with sendValuesBack=true. The tracer needs to be
    sent the computed values from the other streams.
  - send the data to the first stream, which then goes thru all streams
  - the view automatically re-renders
  - since liveChange === lastChange, update=false
  - since sendValuesBack=true, send the values to the tracer. But, update=false so
    this will not add to the tracer's history.

  4. Changes in otherStreams
  - initially send the ids of the streams
  - send new values with ids
  */

  if (isMeiosisTracerOn()) {
    const toJS = params.toJS || (model => JSON.parse(JSON.stringify(model)))
    const fromJS = params.fromJS || (model => model)
    const toUpdate = params.toUpdate || (model => () => model)
    const bufferedValues = []
    const bufferedStreamValues = []
    let devtoolInitialized = false
    let sendValues = true

    let liveChange = true

    const lastStream = params.dataStreams[params.dataStreams.length - 1]

    const otherStreamIds = []
    const otherStreamsById = {}

    if (params.otherStreams && params.otherStreams.length) {
      params.otherStreams.forEach(otherStream => {
        const streamId = "stream_" + new Date().getTime()
        otherStreamIds.push(streamId)
        otherStreamsById[streamId] = otherStream

        otherStream.map(value => {
          const data = { type: "MEIOSIS_STREAM_VALUE", value, streamId }

          if (devtoolInitialized) {
            window.postMessage(data, "*")
          }
          else {
            bufferedStreamValues.push(data)
          }
        })
      })
    }

    window.addEventListener("message", evt => {
      if (evt.data.type === "MEIOSIS_RENDER_MODEL") {
        sendValues = evt.data.sendValuesBack
        liveChange = false
        params.update(toUpdate(fromJS(evt.data.model)))
      }
      else if (evt.data.type === "MEIOSIS_TRACER_INIT") {
        devtoolInitialized = true

        if (otherStreamIds.length > 0) {
          window.postMessage({ type: "MEIOSIS_STREAM_IDS", streamIds: otherStreamIds }, "*")
        }
        bufferedValues.forEach(values =>
          window.postMessage({ type: "MEIOSIS_VALUES", values, update: true }, "*"))
        bufferedStreamValues.forEach(data => window.postMessage(data, "*"))
      }
      else if (evt.data.type === "MEIOSIS_TRIGGER_STREAM_VALUE") {
        const streamId = evt.data.streamId
        const value = evt.data.value

        otherStreamsById[streamId](value)
      }
    })

    lastStream.map(() => {
      if (sendValues || liveChange) {
        const values = params.dataStreams.map(stream =>
          ({ value: toJS(stream()) }))

        if (devtoolInitialized) {
          window.postMessage({ type: "MEIOSIS_VALUES", values, update: true }, "*")
        }
        else {
          bufferedValues.push(values)
        }
      }
      liveChange = true
    })

    // Send ping in case tracer was already loaded.
    window.postMessage({ type: "MEIOSIS_PING" }, "*")
  }
}

const meiosisTracer = params => {
  trace(params)

  let {
    selector,
    renderModel,
    triggerStreamValue,
    horizontal,
    rows,
    cols,
    parse,
    stringify
  } = params

  const target = document.querySelector(selector)

  if (!target) {
    return
  }

  let accumulateHistory = true

  const receiveValues = createReceiveValues(tracerModel, createTracerView(value => {
    accumulateHistory = value
  }))

  renderModel = renderModel || ((model, sendValuesBack) =>
    window.postMessage({ type: "MEIOSIS_RENDER_MODEL", model, sendValuesBack }, "*"))

  initialView(selector, tracerModel, renderModel, horizontal, rows, cols, parse, stringify)

  triggerStreamValue = triggerStreamValue || ((streamId, value) =>
    window.postMessage({ type: "MEIOSIS_TRIGGER_STREAM_VALUE", streamId, value }, "*"))

  const initStreamIdModel = (streamIds) => {
    streamIds.forEach(streamId =>
      tracerModel.streams[streamId] = { index: 0, values: [] }
    )
    initStreamIds(streamIds, tracerModel.streams, triggerStreamValue, rows, cols)
  }

  const receiveStreamValue = (streamId, value) => {
    const streamState = tracerModel.streams[streamId]

    streamState.values.push(value)
    streamState.index = streamState.values.length - 1

    updateStreamValue(streamId, streamState)
  }

  window.addEventListener("message", evt => {
    if (evt.data.type === "MEIOSIS_VALUES") {
      receiveValues(evt.data.values, accumulateHistory && evt.data.update)
    }
    else if (evt.data.type === "MEIOSIS_STREAM_IDS") {
      const streamIds = evt.data.streamIds
      initStreamIdModel(streamIds)
    }
    else if (evt.data.type === "MEIOSIS_STREAM_VALUE") {
      receiveStreamValue(evt.data.streamId, evt.data.value)
    }
  })

  window.postMessage({ type: "MEIOSIS_TRACER_INIT" }, "*")

  return {
    receiveValues,
    initStreamIdModel,
    receiveStreamValue,
    reset: () => reset(tracerModel)
  }
}

export { meiosisTracer }
