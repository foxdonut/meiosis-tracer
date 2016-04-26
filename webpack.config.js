module.exports = {
  entry: "./src/index.js",
  output: {
    path: "./dist",
    filename: "meiosis-tracer.js",
    library: "meiosisTracer",
    libraryTarget: "commonjs2"
  },
  module: {
    loaders: [
      {
        loader: "babel",
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};
