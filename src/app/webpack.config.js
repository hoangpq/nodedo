const webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: [
    'webpack-hot-middleware/client',
    './index.js',
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin() // Enable HMR
  ],
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js",
  },
  devtool: 'webpack-hot-middleware/client',
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
      {test: /\.html$/, loader: 'file-loader?name=[name].[ext]'}
    ]
  },
};