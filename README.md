# Meiosis-Tracer

Meiosis-Tracer is a development and debugging tool that traces, rewinds, and replays snapshots of
[flyd](https://github.com/paldepind/flyd) or [Mithril](https://mithril.js.org/stream.html) streams.
You can also directly enter your own snapshots and send the value onto the streams. This works
particularly well in [Meiosis](http://meiosis.js.org) applications.

You can use Meiosis-Tracer either by adding it to a page of your web application, or as a
Chrome DevTools Extension.

**VERSION 2.0.0 RELEASED**: see what's new in this [short screencast on YouTube](https://www.youtube.com/watch?v=2T7faqh3unc)

You can install Meiosis-Tracer with `npm`:

```
npm i --save meiosis-tracer
```

Then use it along with Meiosis. First, add an HTML element to your page where you want the tracer
to be rendered, and give it a way to identify it via a selector. For example:

```html
<div id="tracer" style="position: fixed; top: 0px; right: 0px;"></div>
```

Call the `trace` function and pass it the `update` stream and the `dataStreams` that you
want to trace. Optionally, specify `otherStreams` for other streams to trace, such as an
`eventStream`.
Then, create the tracer by passing it the selector for the element where the tracer will be rendered:

```javascript
import meiosisTracer from "meiosis-tracer";

const update = ...;
const model = ...;
const viewModel = model.map(...);
const eventStream = ...;

meiosisTracer({ selector: "#tracer", streams: [ model, viewModel, eventStream ] });
```

This will render the tracer into the element that has the `tracer` id.

You can also download the JavaScript file from
[unpkg](https://unpkg.com/meiosis-tracer) and add it to your page with a plain `<script>` tag.
In that case it will be available as the `meiosisTracer` global variable.

## Chrome DevTools Extension

Meiosis-Tracer is now also available as a Chrome DevTools Extension, so that you can use it without needing to add it to your page.

You can [get it from the Chrome Web Store](https://chrome.google.com/webstore/detail/meiosis-tracer/lcomllmppaiciocfbeefdeoplnfpnnfl).

Once installed:

- If DevTools was already open, close it
- When you open DevTools, you should have a `Meiosis` tab.

Alternatively, you can run it directly from the source code. To do so, clone the repository:

```
git clone https://github.com/foxdonut/meiosis-tracer
```

- In Chrome, open `chrome://extensions`
- Press **Load unpacked extension...**
- Select the `chrome-devtool` directory under `meiosis-tracer`
- If DevTools was already open, close it
- When you open DevTools, you should have a `Meiosis` tab.

Meiosis-Tracer works in the same way either added to the page, or in DevTools. Enjoy!

## Credits

The following repositories were very helpful in developing the Chrome extension for Meiosis-Tracer. My thanks and appreciation go to their authors!

- https://github.com/thingsinjars/devtools-extension
- https://github.com/psykhi/chrome-devtools-extension
- https://github.com/vuejs/vue-devtools
- https://github.com/cerebral/cerebral-debugger

-----

_Meiosis is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._
