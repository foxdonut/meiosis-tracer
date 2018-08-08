/*global process, __dirname*/
var isProd = process.env.NODE_ENV === "prod"
var isDev = process.env.NODE_ENV === "dev"
var isLib = !(isProd || isDev)
var isDevtool = process.env.NODE_ENV === "devtool"

module.exports = isDevtool ? {
  entry: "./src/index.js",
  devtool: "source-map",
  mode: isDev ? "development" : "production",
  output: {
    path: __dirname + "/chrome-devtool",
    filename: "meiosis-tracer.js",
    library: "meiosisTracer",
    libraryTarget: "var"
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
} : {
  entry: "./src/index.js",
  devtool: "source-map",
  mode: isDev ? "development" : "production",
  output: {
    path: __dirname + (isLib ? "/lib" : "/dist"),
    filename: isProd ? "meiosis-tracer.min.js" : "meiosis-tracer.js",
    library: "meiosisTracer",
    libraryTarget: isLib ? "commonjs2" : "umd"
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
}
