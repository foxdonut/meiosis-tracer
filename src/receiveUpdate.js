const receiveUpdate = (tracerModel, view) => (model, update) => {
  const modelAndUpdate = { model, update };
  tracerModel.tracerStates.push(modelAndUpdate);
  tracerModel.tracerIndex = tracerModel.tracerStates.length - 1;

  view(modelAndUpdate, tracerModel);

  return model;
};

export default receiveUpdate;
