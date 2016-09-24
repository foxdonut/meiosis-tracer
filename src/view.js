import jsonFormat from "json-format";

const jsonFormatConfig = {
  type: "space",
  size: 2
};

const tracerContainerId = "tracerContainer";
const tracerId = "tracerSlider";
const tracerToggleId = "tracerToggle";
const tracerResetId = "tracerReset";
const tracerIndexId = "tracerIndex";
const tracerModelId = "tracerModel";
const tracerProposalId = "tracerProposal";

const proposalView = ({model, proposal}, tracerModel) => {
  const tracer = document.getElementById(tracerId);
  tracer.setAttribute("max", String(tracerModel.tracerStates.length - 1));
  tracer.value = String(tracerModel.tracerIndex);

  const tracerIndex = document.getElementById(tracerIndexId);
  tracerIndex.innerHTML = String(tracerModel.tracerIndex);

  const tracerModelEl = document.getElementById(tracerModelId);
  tracerModelEl.value = jsonFormat(model, jsonFormatConfig);

  const tracerProposalEl = document.getElementById(tracerProposalId);
  tracerProposalEl.value = jsonFormat(proposal, jsonFormatConfig);
};

const onSliderChange = (renderRoot, tracerModel) => evt => {
  const index = parseInt(evt.target.value, 10);
  const snapshot = tracerModel.tracerStates[index];
  renderRoot(snapshot.model);
  tracerModel.tracerIndex = index;
  proposalView(snapshot, tracerModel);
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

const onToggle = tracerContainer => evt => {
  const button = evt.target;

  if (tracerContainer.style.display === "none") {
    tracerContainer.style.display = "block";
    button.innerHTML = "Hide";
  }
  else {
    tracerContainer.style.display = "none";
    button.innerHTML = "Show";
  }
};

const onReset = tracerModel => () => {
  reset(tracerModel);
};

const reset = tracerModel => {
  tracerModel.tracerStates.length = 0;
  tracerModel.tracerIndex = 0;
  proposalView({model: {}, proposal: {}}, tracerModel);
};

const initialView = (selector, renderRoot, tracerModel, horizontal) => {
  const target = document.querySelector(selector);

  if (target) {
    const modelRows = horizontal ? "5" : "20";
    const divStyle = horizontal ? " style='float: left'" : "";

    const viewHtml = "<div style='text-align: right'><button id='" + tracerToggleId + "'>Hide</button></div>" +
      "<div id='" + tracerContainerId + "'>" +
      "<div style='text-align: right'><button id='" + tracerResetId + "'>Reset</button></div>" +
      "<input id='" + tracerId + "' type='range' min='0' max='" +
      String(tracerModel.tracerStates.length - 1) +
      "' value='" + String(tracerModel.tracerIndex) + "' style='width: 100%'/>" +
      "<div id='" + tracerIndexId + "'>" + String(tracerModel.tracerIndex) + "</div>" +
      "<div" + divStyle + "><div>Proposal:</div>" +
      "<textarea id='" + tracerProposalId + "' rows='5' cols='40'></textarea></div>" +
      "<div" + divStyle + "><div>Model: (you can type into this box)</div>" +
      "<textarea id='" + tracerModelId + "' rows='" + modelRows + "' cols='40'></textarea></div></div>";

    target.innerHTML = viewHtml;

    const tracerContainer = document.getElementById(tracerContainerId);

    document.getElementById(tracerId).addEventListener("input", onSliderChange(renderRoot, tracerModel));
    document.getElementById(tracerModelId).addEventListener("keyup", onModelChange(renderRoot));
    document.getElementById(tracerToggleId).addEventListener("click", onToggle(tracerContainer));
    document.getElementById(tracerResetId).addEventListener("click", onReset(tracerModel));
  }
};

export { initialView, proposalView, reset };
