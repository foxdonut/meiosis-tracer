import * as C from "./constants"

export const eventListeners = ({
  onToggleTracer,
  onReset,
  onSliderChange,
  onRefresh,
  onStepBack,
  onStepForward,
  onToggleAccumulateHistory
}) => {
  document.getElementById(C.tracerToggleId).addEventListener("click",
    () => onToggleTracer())

  document.getElementById(C.tracerResetId).addEventListener("click",
    () => onReset())

  document.getElementById(C.tracerId).addEventListener("input",
    () => onSliderChange())

  document.getElementById(C.tracerRefreshViewId).addEventListener("click",
    () => onRefresh())

  document.getElementById(C.tracerStepBackId).addEventListener("click",
    () => onStepBack())

  document.getElementById(C.tracerStepForwardId).addEventListener("click",
    () => onStepForward())

  document.getElementById(C.tracerAccumulHistoryId).addEventListener("change",
    () => onToggleAccumulateHistory())
}
