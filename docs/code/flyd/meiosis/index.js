/*global flyd, ReactDOM, meiosisTracer*/

const createActions = update => ({
  increase: () => update(model => {
    model.value = model.value + 1
    return model
  }),
  editName: value => update(model => {
    model.name = value
    return model
  })
})

const createView = actions => model => (
  <div>
    <div>
      <span>Counter: {model.value} </span>
      <button onClick={actions.increase}>Increase</button>
    </div>
    <div>
      <span>Name: </span>
      <input type="text" value={model.name}
        onChange={evt => actions.editName(evt.target.value)}/>
    </div>
    <div>
      <span>Hello, {model.name}</span>
    </div>
  </div>
)

const update = flyd.stream()
const models = flyd.scan((model, func) => func(model),
  { value: 0, name: "" }, update)

const view = createView(createActions(update))
const element = document.getElementById("app")
models.map(model => { ReactDOM.render(view(model), element) })

meiosisTracer({ selector: "#tracer", streams: [
  { stream: models, label: "models" }
]})
