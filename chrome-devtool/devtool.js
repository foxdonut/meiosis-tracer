/*global chrome*/
chrome.devtools.panels.create("Meiosis",
  "meiosis.png",
  "tracer.html",
  function(_panel) {
    // code invoked on panel creation
    var obj = {list:[{id: 1, label: "one"}, {id: 2, label: "two"}], meta: {"4413": true}};
    console.log(JSON.stringify(obj));
    console.log(JSONFormat(JSON.stringify(obj)));
  }
);
