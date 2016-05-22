/*global process*/
var isProd = process.env.NODE_ENV === "prod";
var isDev = process.env.NODE_ENV === "dev";
var isLib = !(isProd || isDev);

var webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    path: isLib ? "./lib" : "./dist",
    filename: isProd ? "meiosis-tracer.min.js" : "meiosis-tracer.js",
    library: "meiosisTracer",
    libraryTarget: isLib ? "commonjs2" : "umd"
  },
  module: {
    loaders: [
      {
        loader: "babel",
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  },
  plugins: isProd ? [
    new webpack.optimize.UglifyJsPlugin()
  ] : []
};
