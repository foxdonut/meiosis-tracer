/*global JSONFormat */
document.getElementById("meiosis-tracer").innerHTML = "Hello, devtool";
var obj = {list:[{id: 1, label: "one"}, {id: 2, label: "two"}], meta: {"4413": true}};
var result1 = JSON.stringify(obj);
var result2 = JSONFormat(JSON.stringify(obj));
document.getElementById("meiosis-tracer").innerHTML = result1 + " ; " + result2;
