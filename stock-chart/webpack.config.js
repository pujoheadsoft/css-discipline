const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.join(__dirname, "src"),
  entry: "./index.js",
  devtool: "inline-source-map",
  output: {
    path: path.join(__dirname, "public"),
    filename: "./bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "src"),
    port: 3000,
    watchContentBase: true
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.(jpe?g|png|svg|gif|ttf|woff)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8192,
            name: "./images/[name].[ext]"
          }
        }
      },
      {
        test: /\.csv$/,
        use: "raw-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html"
    })
  ]
}