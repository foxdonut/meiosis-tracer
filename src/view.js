const onSliderChange = (model, actions) => evt => {
  const index = parseInt(evt.target.value, 10);
  const snapshot = model.tracerStates[index];
  snapshot.tracerIndexChange = index;
  actions.next(snapshot);
};

const view = elementId => ({model, actions}) => {
  const tracerId = "tracerSlider";
  const tracerIndexId = "tracerIndex";
  const tracerModelId = "tracerModel";

  const view = "<div><input id='" + tracerId + "' type='range' min='0' max='" + String(model.tracerStates.length - 1) +
    "' value='" + String(model.tracerIndex) + "'/>" +
    "<span id='" + tracerIndexId + "'>" + String(model.tracerIndex) + "</span><pre id='" + tracerModelId + "'></pre></div>";

  const target = document.getElementById(elementId);

  if (target) {
    if (target.innerHTML === "") {
      target.innerHTML = view;
      document.getElementById(tracerId).addEventListener("input", onSliderChange(model, actions));
    }
    else {
      const tracer = document.getElementById(tracerId);
      tracer.value = String(model.tracerIndex);
      tracer.setAttribute("max", String(model.tracerStates.length - 1));

      const tracerIndex = document.getElementById(tracerIndexId);
      tracerIndex.innerHTML = String(model.tracerIndex);

      const tracerModel = document.getElementById(tracerModelId);
      // FIXME
      const saneModel = {};
      for (var key in model) {
        if (model.hasOwnProperty(key) && !key.startsWith("tracer")) {
          saneModel[key] = model[key];
        }
      }
      tracerModel.innerHTML = JSON.stringify(saneModel);
    }
  }
  return null;
};

export default view;
