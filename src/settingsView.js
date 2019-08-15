import * as C from "./constants"

export const settingsView = ({ element, listeners, direction, rows, cols, autoSend }) => {
  element.innerHTML = `
    <div id='${C.settingsContainerId}'>
      <label title='Align in a row'>
        <input type='radio' name='direction' value='row'
          ${direction === "row" ? "checked" : ""} />
        Row
      </label>
      <label title='Align in a column'>
        <input type='radio' name='direction' value='column'
          ${direction === "column" ? "checked" : ""} />
        Col
      </label>
      <label title='Toggle auto-send'>
        <input id='${C.autoId}' type='checkbox' ${autoSend ? "checked" : ""} />
        Auto
      </label>
      <input title='Number of rows' id='${C.rowsId}' type='text' size='2'
        value='${rows}'/>
      <span> &times; </span>
      <input title='Number of columns' id='${C.colsId}' type='text' size='2'
        value='${cols}'/>
      <button id='${C.hideTracerId}'>Hide</button>
    </div>
    <button id='${C.showTracerId}' style='display:none'>Show</button>
  `

  document.getElementById(C.hideTracerId).addEventListener("click", _evt => {
    listeners.onHideTracer()
  })

  document.getElementById(C.showTracerId).addEventListener("click", _evt => {
    listeners.onShowTracer()
  })

  document.getElementById(C.rowsId).addEventListener("input", evt => {
    listeners.onRowsColsChange(
      parseInt(evt.target.value, 10),
      parseInt(document.getElementById(C.colsId).value, 10)
    )
  })

  document.getElementById(C.colsId).addEventListener("input", evt => {
    listeners.onRowsColsChange(
      parseInt(document.getElementById(C.rowsId).value, 10),
      parseInt(evt.target.value, 10)
    )
  })

  const radios = document.querySelectorAll("input[name='direction']")
  for (let i = 0, t = radios.length; i < t; i++) {
    radios[i].addEventListener("change", evt => {
      if (evt.target.checked) {
        listeners.onDirectionChange(evt.target.value)
      }
    })
  }

  document.getElementById(C.autoId).addEventListener("change", evt => {
    listeners.onAutoChange(evt.target.checked)
  })
}

export const initializeResizeChangeDirection = (listeners, direction) => {
  const directionAccordingToWindowSize = () => {
    const dir = window.innerWidth > window.innerHeight ? "row" : "column"
    const radios = document.querySelectorAll("input[name='direction']")
    for (let i = 0, t = radios.length; i < t; i++) {
      radios[i].checked = radios[i].value === dir
    }
    listeners.onDirectionChange(dir)
  }

  if (direction === "auto") {
    window.addEventListener("resize", directionAccordingToWindowSize)
  }

  if (direction === "row" || direction === "column") {
    listeners.onDirectionChange(direction)
  } else {
    directionAccordingToWindowSize()
  }
}
