import * as C from "./constants"

export const streamView = ({ element, index, listeners, label = "", rows = 5, cols = 40 }) => {
  element.innerHTML =
    "<div id='" + C.streamId(index) + "' style='padding:8px;border:1px solid gray'>" +
      "<div>" + label + "</div>" +
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
}
