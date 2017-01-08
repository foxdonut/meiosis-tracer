const createReceiveValues = (tracerModel, view) => (values, update) => {
  if (update) {
    tracerModel.tracerStates.push(values);
    tracerModel.tracerIndex = tracerModel.tracerStates.length - 1;
  }
  view(values, tracerModel);
};

export { createReceiveValues };
