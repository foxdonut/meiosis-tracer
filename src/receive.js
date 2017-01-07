const createReceiveValues = (tracerModel, view) => values => {
  tracerModel.tracerStates.push(values);
  tracerModel.tracerIndex = tracerModel.tracerStates.length - 1;

  view(values, tracerModel);
};

export { createReceiveValues };
