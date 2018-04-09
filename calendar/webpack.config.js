const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.join(__dirname, "src"),
  entry: "./index.ts",
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
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader"
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
        use: "html-loader"
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
  ],
  resolve: {
    alias: {
      "vue$": "vue/dist/vue.esm.js"
    },
    extensions: [".ts", ".tsx", ".js", ".json"]
  }
}