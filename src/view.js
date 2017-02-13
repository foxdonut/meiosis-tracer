import jsonFormat from "json-format";

const jsonFormatConfig = {
  type: "space",
  size: 2
};

const tracerContainerId = "tracerContainer";
const streamContainerId = "streamContainer";
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

  var streamValueDivs = document.querySelectorAll("div.stream");

  if (streamValueDivs.length === 0) {
    var streamValueDivsMarkup = "";

    for (var i = 0, t = values.length - 1; i < t; i++) {
      streamValueDivsMarkup +=
        "<div class='stream'>" +
          "<textarea rows='5' cols='40'></textarea>" +
        "</div>";
    }
    document.getElementById(streamContainerId).innerHTML = streamValueDivsMarkup;
  }

  var streamTextareas = document.querySelectorAll("div.stream textarea");

  for (i = 0, t = values.length - 1; i < t; i++) {
    streamTextareas[i].value = jsonFormat(values[i].value, jsonFormatConfig);
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
        "<input id='" + tracerId + "' type='range' min='0' max='" +
          String(tracerModel.tracerStates.length - 1) +
          "' value='" + String(tracerModel.tracerIndex) + "' style='width: 100%'/>" +
        "<div id='" + tracerIndexId + "'>" + String(tracerModel.tracerIndex) + "</div>" +
        "<div" + divStyle + ">" +
          "<div>Model: (you can type into this box)</div>" +
          "<textarea id='" + tracerModelId + "' rows='5' cols='40'></textarea>" +
          "<div id='" + errorMessageId + "' style='display: none'><span style='color:red'>Invalid JSON</span></div>" +
        "</div>" +
        "<span id='" + streamContainerId + "'></span>" +
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

export { initialView, tracerView, reset };
