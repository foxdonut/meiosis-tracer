/*global m, meiosisTracer*/

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

const createView = actions => model =>
  m("div",
    m("div",
      m("span", "Counter: ", model.value, " "),
      m("button", { onclick: actions.increase }, "Increase")
    ),
    m("div",
      m("span", "Name: "),
      m("input", { type: "text", value: model.name,
        oninput: evt => actions.editName(evt.target.value) })
    ),
    m("div",
      m("span", "Hello, ", model.name)
    )
  )

const update = m.stream()
const models = m.stream.scan((model, func) => func(model),
  { value: 0, name: "" }, update)

const view = createView(createActions(update))
const element = document.getElementById("app")
models.map(model => { m.render(element, view(model)) })

meiosisTracer({ selector: "#tracer", streams: [ models ]})
