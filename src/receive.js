const createReceiveValues = (tracerModel, view) => (values, update) => {
  if (update) {
    if (tracerModel.tracerStates.length > 0) {
      tracerModel.tracerStates.length = tracerModel.tracerIndex + 1
    }
    tracerModel.tracerStates.push(values)
    tracerModel.tracerIndex = tracerModel.tracerStates.length - 1
  }
  view(values, tracerModel)
}

export { createReceiveValues }
