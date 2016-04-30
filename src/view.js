const tracerId = "tracerSlider";
const tracerIndexId = "tracerIndex";
const tracerModelId = "tracerModel";
const tracerUpdateId = "tracerUpdate";

const updateView = ({model, update}, tracerModel) => {
  const tracer = document.getElementById(tracerId);
  tracer.value = String(tracerModel.tracerIndex);
  tracer.setAttribute("max", String(tracerModel.tracerStates.length - 1));

  const tracerIndex = document.getElementById(tracerIndexId);
  tracerIndex.innerHTML = String(tracerModel.tracerIndex);

  const tracerModelEl = document.getElementById(tracerModelId);
  tracerModelEl.innerHTML = JSON.stringify(model);

  const tracerUpdateEl = document.getElementById(tracerUpdateId);
  tracerUpdateEl.innerHTML = JSON.stringify(update);
};

const onSliderChange = (tracerModel, renderRoot) => evt => {
  const index = parseInt(evt.target.value, 10);
  const snapshot = tracerModel.tracerStates[index];
  renderRoot(snapshot.model);
  tracerModel.tracerIndex = index;
  updateView(snapshot, tracerModel);
};

const onModelChange = renderRoot => evt => {
  try {
    const model = JSON.parse(evt.target.value);
    renderRoot(model);
  }
  catch (err) {
    // ignore invalid JSON
  }
};

const view = (elementId, renderRoot) => (modelAndUpdate, tracerModel) => {

  const viewHtml = "<div><input id='" + tracerId + "' type='range' min='0' max='" + String(tracerModel.tracerStates.length - 1) +
    "' value='" + String(tracerModel.tracerIndex) + "'/>" +
    "<div id='" + tracerIndexId + "'>" + String(tracerModel.tracerIndex) + "</div>" +
    "<textarea id='" + tracerUpdateId + "' rows='5' cols='100'></textarea>" +
    "<textarea id='" + tracerModelId + "' rows='5' cols='100'></textarea></div>";

  const target = document.getElementById(elementId);

  if (target) {
    if (target.innerHTML === "") {
      target.innerHTML = viewHtml;
      document.getElementById(tracerId).addEventListener("input", onSliderChange(tracerModel, renderRoot));
      document.getElementById(tracerModelId).addEventListener("keyup", onModelChange(renderRoot));
    }
    else {
      updateView(modelAndUpdate, tracerModel);
    }
  }
  return null;
};

export default view;
