import * as C from "./constants"

export const initialView = ({ tracerModel, rows=5, cols=40, divStyle="" }) =>
  "<div style='text-align: right'><button id='" + C.tracerToggleId + "'>Hide</button></div>" +
  "<div id='" + C.tracerContainerId + "'>" +
    "<div style='text-align: right'><button id='" + C.tracerResetId + "'>Reset</button></div>" +
    "<div>Data streams:</div>" +
    "<input id='" + C.tracerId + "' type='range' min='0' " +
      "max='" + String(tracerModel.tracerStates.length - 1) + "' " +
      "value='" + String(tracerModel.tracerIndex) + "' style='width: 100%'/>" +
    "<button id='" + C.tracerStepBackId + "'>&lt</button> " +
    "<button id='" + C.tracerStepForwardId + "'>&gt</button> " +
    "<span id='" + C.tracerIndexId + "'>" + String(tracerModel.tracerIndex) + "</span>" +
    "<label>" +
      "<input style='margin-left: 16px' type='checkbox' " +
        "id='" + C.tracerAccumulHistoryId + "' checked='checked' />" +
      "Accumulate history" +
    "</label>" +
    "<div" + divStyle + ">" +
      "<div>" +
        "<span>Model: (type into this box) </span>" +
        "<button style='margin-bottom: 4px' id='" + C.tracerRefreshViewId + "'>" +
          "Refresh view" +
        "</button>" +
      "</div>" +
      "<textarea id='" + C.tracerModelId + "' rows='" + rows + "' cols='" + cols + "'>" +
      "</textarea>" +
      "<div id='" + C.errorMessageId + "' style='display: none'>" +
        "<span style='color:red'>Invalid format</span>" +
      "</div>" +
    "</div>" +
    "<span id='" + C.dataStreamContainerId + "'></span>" +
    "<span id='" + C.otherStreamContainerId + "'></span>" +
  "</div>"
