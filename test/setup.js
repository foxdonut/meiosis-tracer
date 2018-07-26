import browserEnv from "browser-env"
browserEnv()

export const triggerEvent = function(element, eventType) {
  const event = document.createEvent("HTMLEvents")
  event.initEvent(eventType, true, true)
  element.dispatchEvent(event)
}

const id = "app"

export const setup = () => {
  document.write("<div id='" + id + "'></div>")
  return document.getElementById(id)
}

export const getElement = id => document.getElementById(id)

