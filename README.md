# Meiosis-Tracer

Meiosis-Tracer is a development and debugging tool that traces, rewinds, and replays snapshots of
[flyd](https://github.com/paldepind/flyd) or [Mithril](https://mithril.js.org/stream.html) streams.
You can also directly enter your own snapshots and send the value onto the streams. This works
particularly well in [Meiosis](http://meiosis.js.org) applications.

You can use Meiosis-Tracer either by adding it to a page of your web application, or as a
Chrome DevTools Extension.

**VERSION 2.0.0 RELEASED**: see what's new in this
[short screencast on YouTube](https://www.youtube.com/watch?v=2T7faqh3unc)

You can install Meiosis-Tracer with `npm`:

```
npm i -D meiosis-tracer
```

Then use it either by
[adding it to your page](#adding-meiosis-tracer-to-your-page), or with the
[Chrome DevTools Extension](#using-the-chrome-devtools-extension).

## Adding Meiosis Tracer To Your Page

First, add an HTML element to your page where you want the tracer
to be rendered, and give it a way to identify it via a selector. For example:

```html
<div id="tracer" style="position: fixed; top: 0px; right: 0px;"></div>
```

Second, import the tracer and call it as a function, passing a `selector` that matches your
HTML element and an array of `streams` that you want to trace. For example:

```javascript
import meiosisTracer from "meiosis-tracer";

const models = ...; // a stream
const states = model.map(...); // another stream

meiosisTracer({ selector: "#tracer", streams: [ models, states ] });
```

This will render the tracer into the HTML element that has the `tracer` id.

You can also download the JavaScript file from
[unpkg](https://unpkg.com/meiosis-tracer) and add it to your page with a plain `<script>` tag.
In that case it will be available as the `meiosisTracer` global variable.

## Using the Chrome DevTools Extension

Meiosis-Tracer is now also available as a Chrome DevTools Extension, so that you can use it
without needing to add it to your page.

You can
[get it from the Chrome Web Store](https://chrome.google.com/webstore/detail/meiosis-tracer/lcomllmppaiciocfbeefdeoplnfpnnfl).

Once installed:

- If DevTools is already open, close it
- When you open DevTools, you should have a `Meiosis` tab.

Alternatively, you can run it directly from the source code. To do so, clone the repository:

```
git clone https://github.com/foxdonut/meiosis-tracer
```

- If DevTools was already open, close it
- In Chrome, open `chrome://extensions`
- Press **Load unpacked extension...**
- Select the `chrome-devtool` directory under `meiosis-tracer`
- When you open DevTools, you should have a `Meiosis` tab.

Meiosis-Tracer works in the same way either added to the page, or in DevTools. Enjoy!

## Using the Tracer

## Full List of Options

### Options for `meiosisTracer({ ... })`

These are general options for the tracer. Stream-related options apply to all streams, unless
overridden by a stream-specific option (see below.) Stream-related options are `stringify`,
`parse`, `listen`, and `emit`.

| option | purpose | values  | default |
|--------|---------|---------|---------|
| `selector` | CSS selector targetting the HTML element for the tracer | string |    |
| `direction` | layout direction for multiple streams | `row`, `column`, `auto` | `column` |
| `rows` | number of rows in textareas | number | `15`   |
| `cols` | number of columns in textareas | number | `50`   |
| `autoSend` | whether or not to automatically send values | boolean | `true` |
| `stringify` | how to convert a stream value to a string | function | `JSON.stringify(val, null, 4)` |
| `parse` | how to parse a string to a stream value | function | `JSON.parse(str)` |
| `listen` | how to listen to a stream | function | `stream.map` |
| `emit` | how to send a value to a stream | function | `stream(value)` |

### Stream Options

These are stream-specific options. When the same option is specified for the tracer (above) and
for a specific stream, the stream-specific option overrides the tracer option. These options
include  `stringify`, `parse`, `listen`, and `emit`.

| option | purpose | values  | default |
|--------|---------|---------|---------|
| `stream` | the stream to be traced | stream | |
| `label` | the label for the stream | string | `Stream N` |
| `hist` | whether or not to accumulate history | boolean | `true` |
| `hide` | whether or not to initially hide the stream | boolean | `false` |
| `stringify` | how to convert a stream value to a string | function | `JSON.stringify(val, null, 4)` |
| `parse` | how to parse a string to a stream value | function | `JSON.parse(str)` |
| `listen` | how to listen to a stream | function | `stream.map` |
| `emit` | how to send a value to a stream | function | `stream(value)` |

## Credits

The following repositories were very helpful in developing the Chrome extension for Meiosis-Tracer.
My thanks and appreciation go to their authors!

- https://github.com/thingsinjars/devtools-extension
- https://github.com/psykhi/chrome-devtools-extension
- https://github.com/vuejs/vue-devtools
- https://github.com/cerebral/cerebral-debugger

-----

_Meiosis is developed by [foxdonut](https://github.com/foxdonut)
([@foxdonut00](http://twitter.com/foxdonut00)) and is released under the MIT license._
