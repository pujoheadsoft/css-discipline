const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: {
    style: "./resources/css/style.js"
  },
  output: {
    path: path.join(__dirname, "css"),
    filename: "resources/css/bundle.css"
  },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    port: 3000,
    watchContentBase: true
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader?outputStyle=expanded"]
        })
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("bundle.css"),
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
}