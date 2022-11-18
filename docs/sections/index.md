# [Meiosis-Tracer](https://github.com/foxdonut/meiosis-tracer) Documentation

## Contents

- [Introduction](#introduction)
- [Adding the Tracer To Your Page](#adding_the_tracer)
- [Using the Chrome DevTools Extension](#using_chrome_extension)
- [Using the Tracer](#using_the_tracer)
- [Full List of Options](#options)

<a name="introduction"></a>
## Introduction

Meiosis-Tracer is a development and debugging tool that traces, rewinds, and replays snapshots of
streams such as [flyd](https://github.com/paldepind/flyd) and
[Mithril Stream](https://mithril.js.org/stream.html).

You can also directly enter your own snapshots and send the values onto the streams. This works
particularly well in [Meiosis](https://meiosis.js.org) applications. Of course, Meiosis-Tracer also
works with Meiosis's
[Simple Stream](https://meiosis.js.org/docs/setup-js-stream-implementation.html).

You can install Meiosis-Tracer with `npm`:

```
npm i -D meiosis-tracer
```

You can also download the JavaScript file from
[unpkg](https://unpkg.com/meiosis-tracer) and add it to your page with a plain `<script>` tag.
In that case it will be available as the `meiosisTracer` global variable.

Then use it either by
[adding it to your page](#adding_the_tracer), or with the
[Chrome DevTools Extension](#using_chrome_extension).

<a name="adding_the_tracer"></a>
## Adding the Tracer To Your Page

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

See [Using the Tracer](#using_the_tracer) for more details and examples.

<a name="using_chrome_extension"></a>
## Using the Chrome DevTools Extension

Meiosis-Tracer is now also available as a Chrome DevTools Extension, so that you can use it
without needing to add it to your page.

You can
[get it from the Chrome Web Store](https://chrome.google.com/webstore/detail/meiosis-tracer/lcomllmppaiciocfbeefdeoplnfpnnfl).

Alternatively, you can run it directly from the source code. To do so, clone the repository:

```
git clone https://github.com/foxdonut/meiosis-tracer
cd meiosis-tracer
npm ci
npm start
```

- In Chrome, open `chrome://extensions`
- Press **Load unpacked**
- Select the `chrome-devtool` directory under `meiosis-tracer`

Once installed:

- If DevTools is already open, close it
- When you open DevTools, you should have a `Meiosis` tab.

To trace streams in your application, call `meiosisTracer` but **DO NOT** specify a `selector`:

```javascript
import meiosisTracer from "meiosis-tracer";

const models = ...; // a stream
const states = model.map(...); // another stream

meiosisTracer({ streams: [ models, states ] });
```

The Meiosis-Tracer UI works in the same way either added to the page, or in DevTools.

See [Using the Tracer](#using_the_tracer) for more details and examples.

### Credits

The following repositories were very helpful in developing the Chrome extension for Meiosis-Tracer.
My thanks and appreciation go to their authors!

- https://github.com/thingsinjars/devtools-extension
- https://github.com/psykhi/chrome-devtools-extension
- https://github.com/vuejs/vue-devtools
- https://github.com/cerebral/cerebral-debugger

<a name="using_the_tracer"></a>
## Using the Tracer

At it simplest, the Tracer works with
[Flyd](https://github.com/paldepind/flyd) or [Mithril](https://mithril.js.org/stream.html) streams
without any configuration. Simply call `meiosisTracer` and indicate the `streams` that you want to
trace. That's all you need if you are using the Chrome Extension. If you want to add the Tracer to
your page instead, also indicate the `selector`.

Here is a Flyd example:

@flems code/flyd/basic/index.js,app.html flyd,meiosis-tracer

And here is the same example with Mithril-Stream:

@flems code/mithril/basic/index.js,app.html mithril,mithril-stream,meiosis-tracer

The controls that you see at the top of the Tracer are as follows:

- **Row / Col**: when you trace more than one stream, this indicates the layout direction of the
boxes. _When using the Tracer in Chrome DevTools, the layout automatically changes according
to the position of your DevTools window._
- **Auto**: whether or not to automatically send values when you use the slider or the arrow buttons
to go back and forth in history.
- **15 &times; 50**: this is the number of rows and columns in the textareas. You can change these
values to adjust the size of the textareas. Note that this stops working on textareas if you
resize them manually.
- **Hide button**: hides the Tracer.

Each stream also has these controls:

- **Hist**: whether or not to accumulate history. This automatically shuts off if you have Auto on
and use the slider or arrow buttons to go back and forth in history.
- **Hide button**: hide an individual stream.
- **Arrow buttons**: go back and forth in history.
- **Send**: send the value entered in the textarea onto the stream. Note that the value that you
enter in the textarea must be valid JSON, or be recognized by the `parse` function that you
specify (see below for full list of options), otherwise an error will occur.
- **Reset**: wipes out the stream's history.

By default, streams are labeled `Stream 0`, `Stream 1`, etc. To specify different labels, use
objects in the `streams` array. Each object must have a `stream` property for the stream. Then,
use `label` to indicate the label:

@flems code/flyd/meiosis/index.js,app.html flyd,react,react-dom,meiosis-tracer 800

You can also specify options to the tracer itself, which apply to all streams. In the
example below, we indicated the number of `rows` for the textarea, and how to `stringify`
values:

@flems code/mithril/meiosis/index.js,app.html mithril,mithril-stream,meiosis-tracer 800

The Tracer can also work with other stream libraries such as
[RxJS](https://rxjs-dev.firebaseapp.com/), [most.js](https://github.com/cujojs/most), and so on.
In those cases, specify the `listen` and `emit` properties to indicate how to listen to a stream
and how to emit a value onto a stream. Here is an example with RxJS:

@flems code/rxjs/basic/index.js,app.html rxjs,meiosis-tracer 600

> For more examples using Meiosis-Tracer, see the
[Meiosis Examples](http://meiosis.js.org/examples.html).

<a name="options"></a>
## Full List of Options

### Options for `meiosisTracer({ ... })`

These are general options for the tracer. Stream-related options apply to all streams.

| option | purpose | values  | default |
|--------|---------|---------|---------|
| `selector` | CSS selector targetting the HTML element for the tracer | string |    |
| `stream` | array of streams to be traced | array |  |
| `direction` | layout direction for multiple streams | `row`, `column`, `auto` | `column` |
| `theme` | add a `theme-<name>` class | any string | `light` |
| `rows` | number of rows in textareas | number | `15`   |
| `cols` | number of columns in textareas | number | `50`   |
| `autoSend` | whether or not to automatically send values | boolean | `true` |
| `stringify` | how to convert a stream value to a string | function | `JSON.stringify(val, null, 4)` |
| `parse` | how to parse a string to a stream value | function | `JSON.parse(str)` |
| `listen` | how to listen to a stream | function | `(stream, fn) => stream.map(fn)` |
| `emit` | how to send a value to a stream | function | `(stream, value) => stream(value)` |

### Stream Options

These are stream-specific options. Indicate these options within properties of the objects that
you pass to the `streams` array.

| option | purpose | values  | default |
|--------|---------|---------|---------|
| `stream` | the stream to be traced | stream | |
| `label` | the label for the stream | string | `Stream N` |
| `hist` | whether or not to accumulate history | boolean | `true` |
| `hide` | whether or not to initially hide the stream | boolean | `false` |

-----

[Meiosis-Tracer](https://github.com/foxdonut/meiosis-tracer) is developed by
[@foxdonut00](http://twitter.com/foxdonut00) / [foxdonut](https://github.com/foxdonut)
and is released under the MIT license.
