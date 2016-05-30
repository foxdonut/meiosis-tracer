# Meiosis-Tracer

Meiosis-Tracer is a learning and debugging tool that traces, rewinds, and replays updates in a
[Meiosis](http://meiosis.js.org) application. You can also directly enter your own model snapshots
and see the resulting view.

You can install it with `npm`:

```
npm i --save meiosis-tracer
```

Then use it along with Meiosis. First, add an HTML element to your page where you want the tracer
to be rendered, and give it a way to identify it via a selector. For example:

```html
<div id="tracer" style="position: fixed; top: 0px; right: 0px;"></div>
```

Then, create the tracer by passing it the `createComponent` and `renderRoot` functions from your
`Meiosis` instance, along with the selector for the element where the tracer will be rendered:

```javascript
import { init } from "meiosis";
import { renderer } from "meiosis-react";
import meiosisTracer from "meiosis-tracer";

const Meiosis = init(renderer.intoId("app"));
const createComponent = Meiosis.createComponent;
const Main = createComponent({...});
const renderRoot = Meiosis.run(Main);
meiosisTracer(createComponent, renderRoot, "#tracer");
```

This will render the tracer into the element that has the `tracer` id.

You can also download the JavaScript file from the [Meiosis builds](http://meiosis.js.org/builds) and add it to your page with a plain `<script>` tag. In that case it will be available as the `meiosisTracer` global variable.

The [Meiosis Guide](https://www.gitbook.com/book/foxdonut/meiosis-guide/) contains a
[chapter on Meiosis-Tracer](https://foxdonut.gitbooks.io/meiosis-guide/content/tracing_and_debugging_with_meiosis-tracer.html).

You will also find [TodoMVC](http://todomvc.com) examples in the
[meiosis-examples repository](https://github.com/foxdonut/meiosis-examples/tree/master/examples/todomvc) which use Meiosis-Tracer.

Finally, the [todo-list example](https://github.com/foxdonut/meiosis-examples/tree/master/examples/todo-list)
also uses Meiosis-Tracer.

--

_Meiosis is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._
