/*global rxjs, meiosisTracer*/

const app = document.getElementById("app")
const stream1 = new rxjs.BehaviorSubject("test")

meiosisTracer({
  selector: "#tracer",
  listen: (stream, fn) => stream1.subscribe(fn),
  emit: (stream, value) => stream.next(value),
  streams: [
    { stream: stream1,
      label: "Behavior Subject 1"
    }
  ]
})

stream1.next({ hello: "world" })
stream1.subscribe(value => {
  app.innerHTML = app.innerHTML + JSON.stringify(value) + "<br>"
})
