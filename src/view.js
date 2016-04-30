const onSliderChange = (tracerModel, renderRoot) => evt => {
  const index = parseInt(evt.target.value, 10);
  const snapshot = tracerModel.tracerStates[index];
  renderRoot(snapshot.model);
  tracerModel.tracerIndex = index;
  updateView(snapshot, tracerModel);
};

const tracerId = "tracerSlider";
const tracerIndexId = "tracerIndex";
const tracerModelId = "tracerModel";

const updateView = ({model, update}, tracerModel) => {
  const tracer = document.getElementById(tracerId);
  tracer.value = String(tracerModel.tracerIndex);
  tracer.setAttribute("max", String(tracerModel.tracerStates.length - 1));

  const tracerIndex = document.getElementById(tracerIndexId);
  tracerIndex.innerHTML = String(tracerModel.tracerIndex);

  const tracerModelLog = document.getElementById(tracerModelId);
  tracerModelLog.innerHTML = "model: " + JSON.stringify(model) + "\n" +
    "update: " + JSON.stringify(update);
};

const view = (elementId, renderRoot) => (modelAndUpdate, tracerModel) => {

  const viewHtml = "<div><input id='" + tracerId + "' type='range' min='0' max='" + String(tracerModel.tracerStates.length - 1) +
    "' value='" + String(tracerModel.tracerIndex) + "'/>" +
    "<span id='" + tracerIndexId + "'>" + String(tracerModel.tracerIndex) + "</span>" +
    "<textarea id='" + tracerModelId + "' rows='5' cols='100'></textarea></div>";

  const target = document.getElementById(elementId);

  if (target) {
    if (target.innerHTML === "") {
      target.innerHTML = viewHtml;
      document.getElementById(tracerId).addEventListener("input", onSliderChange(tracerModel, renderRoot));
    }
    else {
      updateView(modelAndUpdate, tracerModel);
    }
  }
  return null;
};

export default view;
