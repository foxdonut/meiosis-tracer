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
[flyd](https://github.com/paldepind/flyd) or [Mithril](https://mithril.js.org/stream.html) streams.
It can also work with other stream libraries such as [RxJS](https://rxjs-dev.firebaseapp.com/),
[most.js](https://github.com/cujojs/most), and so on.

You can also directly enter your own snapshots and send the values onto the streams. This works
particularly well in [Meiosis](http://meiosis.js.org) applications.

You can use Meiosis-Tracer either by adding it to a page of your web application, or as a
Chrome DevTools Extension.

**VERSION 2.0.0 RELEASED**: see what's new in this
[short screencast on YouTube](https://www.youtube.com/watch?v=2T7faqh3unc)

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

<a name="using_chrome_extension"></a>
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

### Credits

The following repositories were very helpful in developing the Chrome extension for Meiosis-Tracer.
My thanks and appreciation go to their authors!

- https://github.com/thingsinjars/devtools-extension
- https://github.com/psykhi/chrome-devtools-extension
- https://github.com/vuejs/vue-devtools
- https://github.com/cerebral/cerebral-debugger

<a name="using_the_tracer"></a>
## Using the Tracer

### RxJS example

@flems lib/meiosis-tracer.js,code/rxjs/basic/index.js,app.html rxjs

<a name="options"></a>
## Full List of Options

### Options for `meiosisTracer({ ... })`

These are general options for the tracer. Stream-related options apply to all streams.

| option | purpose | values  | default |
|--------|---------|---------|---------|
| `selector` | CSS selector targetting the HTML element for the tracer | string |    |
| `direction` | layout direction for multiple streams | `row`, `column`, `auto` | `column` |
| `rows` | number of rows in textareas | number | `15`   |
| `cols` | number of columns in textareas | number | `50`   |
| `autoSend` | whether or not to automatically send values | boolean | `true` |
| `stringify` | how to convert a stream value to a string | function | `JSON.stringify(val, null, 4)` |
| `parse` | how to parse a string to a stream value | function | `JSON.parse(str)` |
| `listen` | how to listen to a stream | function | `(stream, fn) => stream.map(fn)` |
| `emit` | how to send a value to a stream | function | `(stream, value) => stream(value)` |

### Stream Options

These are stream-specific options.

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
