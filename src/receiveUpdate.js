const receiveUpdate = (tracerModel, view) => (model, update) => {
  const modelCopy = JSON.parse(JSON.stringify(model));
  const modelAndUpdate = { model: modelCopy, update };
  tracerModel.tracerStates.push(modelAndUpdate);
  tracerModel.tracerIndex = tracerModel.tracerStates.length - 1;

  view(modelAndUpdate, tracerModel);

  return model;
};

export default receiveUpdate;
