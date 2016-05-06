const tracerId = "tracerSlider";
const tracerIndexId = "tracerIndex";
const tracerModelId = "tracerModel";
const tracerUpdateId = "tracerUpdate";

const updateView = ({model, update}, tracerModel) => {
  const tracer = document.getElementById(tracerId);
  tracer.setAttribute("max", String(tracerModel.tracerStates.length - 1));
  tracer.value = String(tracerModel.tracerIndex);

  const tracerIndex = document.getElementById(tracerIndexId);
  tracerIndex.innerHTML = String(tracerModel.tracerIndex);

  const tracerModelEl = document.getElementById(tracerModelId);
  tracerModelEl.innerHTML = JSON.stringify(model);

  const tracerUpdateEl = document.getElementById(tracerUpdateId);
  tracerUpdateEl.innerHTML = JSON.stringify(update);
};

const onSliderChange = (renderRoot, tracerModel) => evt => {
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

const initialView = (selector, renderRoot, tracerModel) => {
  const target = document.querySelector(selector);

  if (target) {
    const viewHtml = "<div><input id='" + tracerId + "' type='range' min='0' max='" +
      String(tracerModel.tracerStates.length - 1) +
      "' value='" + String(tracerModel.tracerIndex) + "'/>" +
      "<div id='" + tracerIndexId + "'>" + String(tracerModel.tracerIndex) + "</div>" +
      "<textarea id='" + tracerUpdateId + "' rows='1' cols='50' style='display: block'></textarea>" +
      "<textarea id='" + tracerModelId + "' rows='1' cols='50' style='display: block'></textarea></div>";

    target.innerHTML = viewHtml;
    document.getElementById(tracerId).addEventListener("input", onSliderChange(renderRoot, tracerModel));
    document.getElementById(tracerModelId).addEventListener("keyup", onModelChange(renderRoot));
  }
};

export { initialView, updateView };
