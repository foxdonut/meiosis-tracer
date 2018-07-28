import * as C from "./constants"

export const streamView = ({ element, index, listeners, label = "", rows, cols }) => {
  const streamBoxStyle = "padding:8px;border:1px solid gray"

  element.innerHTML =
    "<div id='" + C.streamId(index) + "' style='" + streamBoxStyle + "'>" +
      "<div>" +
        "<span>" + label + " </span>" +
        "<button id='" + C.hideStreamId(index) + "'>Hide</button>" +
      "</div>" +
      "<textarea id='" + C.modelId(index) + "' rows='" + rows + "' cols='" + cols + "'>" +
      "</textarea>" +
      "<div>" +
        "<input id='" + C.sliderId(index) + "' type='range' min='0' max='0' value='0'" +
          " style='width: 100%' />" +
        "<button id='" + C.stepBackId(index) + "'>&lt</button> " +
        "<button id='" + C.stepForwardId(index) + "'>&gt</button> " +
        "<span id='" + C.sliderValueId(index) + "'>-1</span> " +
        "<button id='" + C.sendId(index) + "'>Send</button>" +
      "</div>" +
    "</div>" +
    "<div id='" + C.hiddenStreamId(index) + "' style='display:none'>" +
      "<span>" + label + " </span>" +
      "<button id='" + C.showStreamId(index) + "'>Show</button>" +
    "</div>"

  document.getElementById(C.sliderId(index)).addEventListener("input", evt => {
    listeners.onSliderChange(parseInt(evt.target.value, 10))
  })

  const stepBack = document.getElementById(C.stepBackId(index))
  stepBack.addEventListener("click", _evt => {
    listeners.onStepBack()
  })
  stepBack.disabled = true

  const stepForward = document.getElementById(C.stepForwardId(index))
  stepForward.addEventListener("click", _evt => {
    listeners.onStepForward()
  })
  stepForward.disabled = true

  document.getElementById(C.sendId(index)).addEventListener("click", _evt => {
    listeners.onSend(document.getElementById(C.modelId(index)).value)
  })

  document.getElementById(C.hideStreamId(index)).addEventListener("click", _evt => {
    document.getElementById(C.streamId(index)).style = "display:none"
    document.getElementById(C.hiddenStreamId(index)).style = streamBoxStyle
  })

  document.getElementById(C.showStreamId(index)).addEventListener("click", _evt => {
    document.getElementById(C.hiddenStreamId(index)).style = "display:none"
    document.getElementById(C.streamId(index)).style = streamBoxStyle
  })
}
