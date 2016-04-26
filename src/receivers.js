const receivers = [
  (model, update) => {
    const tracerIndexChange = parseInt(update.tracerIndexChange, 10);
    if (tracerIndexChange >= 0) {
      model.tracerIndex = tracerIndexChange;
    }
    else {
      model.tracerStates.push(model);
      model.tracerIndex = model.tracerStates.length - 1;
    }
    return model;
  }
];

export default receivers;
