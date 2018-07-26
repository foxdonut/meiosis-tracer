import * as C from "./constants"

export const settingsView = ({ element, listeners, rows = 5, cols = 40 }) => {
  element.innerHTML =
    "<div>" +
      "<span>Rows: </span>" +
      "<input id='" + C.rowsId + "' type='text' size='2' value='" + rows + "'/>" +
      "<span> Cols: </span> " +
      "<input id='" + C.colsId + "' type='text' size='2' value='" + cols + "'/>" +
    "</div>"

  document.getElementById(C.rowsId).addEventListener("input", evt => {
    listeners.onRowsColsChange(parseInt(evt.target.value, 10), parseInt(document.getElementById(C.colsId).value, 10))
  })

  document.getElementById(C.colsId).addEventListener("input", evt => {
    listeners.onRowsColsChange(parseInt(document.getElementById(C.rowsId).value, 10), parseInt(evt.target.value, 10))
  })
}
