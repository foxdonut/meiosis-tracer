import * as C from "./constants"

export const settingsView = ({ element, listeners, rows = 5, cols = 40 }) => {
  element.innerHTML =
    "<div>" +
      "<label title='Align vertically'>" +
        "<input type='radio' name='orient' value='column' checked />" +
        "Ver " +
      "</label>" +
      "<label title='Align horizontally'>" +
        "<input type='radio' name='orient' value='row' />" +
        "Hor " +
      "</label>" +
      "<input title='Number of rows' id='" + C.rowsId + "' type='text' size='2'" +
        " value='" + rows + "'/>" +
      "<span> &times; </span> " +
      "<input title='Number of columns' id='" + C.colsId + "' type='text' size='2'" +
        " value='" + cols + "'/>" +
      "<label title='Toggle auto-send'>" +
        "<input id='" + C.autoId + "' type='checkbox' checked />" +
        " Auto " +
      "</label>" +
      "<label title='Toggle accumulate history'>" +
        "<input id='" + C.histId + "' type='checkbox' checked />" +
        " Hist " +
      "</label>" +
    "</div>"

  document.getElementById(C.rowsId).addEventListener("input", evt => {
    listeners.onRowsColsChange(parseInt(evt.target.value, 10), parseInt(document.getElementById(C.colsId).value, 10))
  })

  document.getElementById(C.colsId).addEventListener("input", evt => {
    listeners.onRowsColsChange(parseInt(document.getElementById(C.rowsId).value, 10), parseInt(evt.target.value, 10))
  })

  const radios = document.querySelectorAll("input[name='orient']")
  for (let i = 0, t = radios.length; i < t; i++) {
    radios[i].addEventListener("change", evt => {
      listeners.onOrientChange(evt.target.value)
    })
  }

  document.getElementById(C.autoId).addEventListener("change", evt => {
    listeners.onAutoChange(evt.target.checked)
  })

  document.getElementById(C.histId).addEventListener("change", evt => {
    listeners.onHistChange(evt.target.checked)
  })
}
