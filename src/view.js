import jsonFormat from "json-format";

const jsonFormatConfig = {
  type: "space",
  size: 2
};

const tracerContainerId = "tracerContainer";
const dataStreamContainerId = "dataStreamContainer";
const otherStreamContainerId = "otherStreamContainer";
const tracerId = "tracerSlider";
const tracerToggleId = "tracerToggle";
const tracerResetId = "tracerReset";
const tracerIndexId = "tracerIndex";
const tracerModelId = "tracerModel";
const errorMessageId = "errorMessage";
let errorMessage = null;
let divStyle = null;

const tracerView = (values, tracerModel) => {
  const tracer = document.getElementById(tracerId);
  tracer.setAttribute("max", String(tracerModel.tracerStates.length - 1));
  tracer.value = String(tracerModel.tracerIndex);

  const tracerIndex = document.getElementById(tracerIndexId);
  tracerIndex.innerHTML = String(tracerModel.tracerIndex);

  const tracerModelEl = document.getElementById(tracerModelId);
  tracerModelEl.value = jsonFormat(values[0].value, jsonFormatConfig);

  var streamValueDivs = document.querySelectorAll("div.dataStream");

  if (streamValueDivs.length === 0) {
    var streamValueDivsMarkup = "";

    for (var i = 1, t = values.length; i < t; i++) {
      streamValueDivsMarkup +=
        "<div class='dataStream'>" +
          "<textarea rows='5' cols='40'></textarea>" +
        "</div>";
    }
    document.getElementById(dataStreamContainerId).innerHTML = streamValueDivsMarkup;
  }

  var streamTextareas = document.querySelectorAll("div.dataStream textarea");

  for (i = 1, t = values.length; i < t; i++) {
    streamTextareas[i - 1].value = jsonFormat(values[i].value, jsonFormatConfig);
  }
};

const onSliderChange = (renderModel, tracerModel) => evt => {
  const index = parseInt(evt.target.value, 10);
  const snapshot = tracerModel.tracerStates[index];
  tracerModel.tracerIndex = index;
  const model = snapshot[0].value;
  renderModel(model, false);
  tracerView(snapshot, tracerModel);
};

const onStreamSliderChange = (streamModel, streamId) => evt => {
  const streamState = streamModel[streamId];
  const index = parseInt(evt.target.value, 10);

  streamState.index = index;

  updateStreamValue(streamId, streamState);
};

const onStreamValueChange = (streamId, textarea, triggerStreamValue) => () => {
  try {
    const value = JSON.parse(textarea.value);
    triggerStreamValue(streamId, value);
    errorMessage.style.display = "none";
  }
  catch (err) {
    errorMessage.style.display = "block";
  }
};

const onModelChange = renderModel => evt => {
  try {
    const model = JSON.parse(evt.target.value);
    renderModel(model, true);
    errorMessage.style.display = "none";
  }
  catch (err) {
    errorMessage.style.display = "block";
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

const reset = (tracerModel) => {
  const snapshot = tracerModel.tracerStates[tracerModel.tracerStates.length - 1];
  tracerModel.tracerStates.length = 1;
  tracerModel.tracerStates[0] = snapshot;
  tracerModel.tracerIndex = 0;
  tracerView(snapshot, tracerModel);
};

const initialView = (selector, tracerModel, renderModel, horizontal) => {
  const target = document.querySelector(selector);

  if (target) {
    divStyle = horizontal ? " style='float: left'" : "";

    const viewHtml =
      "<div style='text-align: right'><button id='" + tracerToggleId + "'>Hide</button></div>" +
      "<div id='" + tracerContainerId + "'>" +
        "<div style='text-align: right'><button id='" + tracerResetId + "'>Reset</button></div>" +
        "<div>Data streams:</div>" +
        "<input id='" + tracerId + "' type='range' min='0' max='" +
          String(tracerModel.tracerStates.length - 1) +
          "' value='" + String(tracerModel.tracerIndex) + "' style='width: 100%'/>" +
        "<div id='" + tracerIndexId + "'>" + String(tracerModel.tracerIndex) + "</div>" +
        "<div" + divStyle + ">" +
          "<div>Model: (you can type into this box)</div>" +
          "<textarea id='" + tracerModelId + "' rows='5' cols='40'></textarea>" +
          "<div id='" + errorMessageId + "' style='display: none'><span style='color:red'>Invalid JSON</span></div>" +
        "</div>" +
        "<span id='" + dataStreamContainerId + "'></span>" +
        "<span id='" + otherStreamContainerId + "'></span>" +
      "</div>";

    target.innerHTML = viewHtml;

    const tracerContainer = document.getElementById(tracerContainerId);
    errorMessage = document.getElementById(errorMessageId);

    document.getElementById(tracerId).addEventListener("input", onSliderChange(renderModel, tracerModel));
    document.getElementById(tracerModelId).addEventListener("keyup", onModelChange(renderModel));
    document.getElementById(tracerToggleId).addEventListener("click", onToggle(tracerContainer));
    document.getElementById(tracerResetId).addEventListener("click", onReset(tracerModel));
  }
};

const initStreamIds = (streamIds, streamModel, triggerStreamValue) => {
  var streamValueDivsMarkup = "<div>Other streams:</div>";

  streamIds.forEach(streamId =>
    streamValueDivsMarkup +=
      "<div class='otherStream' id='" + streamId + "'>" +
        "<input type='range' min='0' max='0' value='0' style='width: 100%'/>" +
        "<div>0</div>" +
        "<textarea rows='5' cols='40'></textarea>" +
        "<div><button>Trigger</button></div>" +
      "</div>"
  );
  document.getElementById(otherStreamContainerId).innerHTML = streamValueDivsMarkup;

  streamIds.forEach(streamId => {
    const container = document.getElementById(streamId);

    const input = container.getElementsByTagName("input")[0];
    input.addEventListener("input", onStreamSliderChange(streamModel, streamId));

    const button = container.getElementsByTagName("button")[0];
    const textarea = container.getElementsByTagName("textarea")[0];
    button.addEventListener("click", onStreamValueChange(streamId, textarea, triggerStreamValue));
  });
};

const updateStreamValue = (streamId, streamState) => {
  const container = document.getElementById(streamId);
  const textarea = container.getElementsByTagName("textarea")[0];
  const input = container.getElementsByTagName("input")[0];
  const div = container.getElementsByTagName("div")[0];

  textarea.value = jsonFormat(streamState.values[streamState.index], jsonFormatConfig);
  input.setAttribute("max", String(streamState.values.length - 1));
  input.value = String(streamState.index);
  div.innerHTML = String(streamState.index);
};

export { initialView, tracerView, reset, initStreamIds, updateStreamValue };
