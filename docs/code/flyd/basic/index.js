/*global flyd, meiosisTracer*/

const app = document.getElementById("app")
const stream0 = flyd.stream("test")

meiosisTracer({
  selector: "#tracer",
  streams: [ stream0 ]
})

stream0({ hello: "world" })
stream0.map(value => {
  app.innerHTML = app.innerHTML + JSON.stringify(value) + "<br>"
})
