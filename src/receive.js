const receive = (tracerModel, view) => (model, proposal) => {
  const modelCopy = JSON.parse(JSON.stringify(model));
  const modelAndProposal = { model: modelCopy, proposal };
  tracerModel.tracerStates.push(modelAndProposal);
  tracerModel.tracerIndex = tracerModel.tracerStates.length - 1;

  view(modelAndProposal, tracerModel);

  return model;
};

export default receive;
