const path = require("path"),
  webpack = require("webpack"),
  distPath = path.resolve(__dirname, "dist"),
  srcPath = path.resolve(__dirname, "src/client"),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  HtmlWebPackPlugin = require("html-webpack-plugin");

const production =
  process.env.NODE_ENV && process.env.NODE_ENV === "production";

const Dotenv = require("dotenv-webpack");
if (!production) {
  require("dotenv").config();
}

const modeWebpack = production ? "production" : "development";

module.exports = {
  // context: srcPath,
  entry: "./src/client/index.js",
  output: {
    filename: "client.js",
    path: distPath,
    publicPath: "/dist/"
  },
  devServer: {
    contentBase: srcPath,
    port: 3000,
    open: true,
    historyApiFallback: true
  },
  mode: modeWebpack,
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015", "react"],
              plugins: [
                "transform-object-rest-spread",
                "async-to-promises",
                "babel-plugin-transform-class-properties"
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      }
      //loaders for other file types can go here
    ]
  },
  plugins: [
    new Dotenv(),
    new ExtractTextPlugin({
      filename: "app.css"
    }),
    new HtmlWebPackPlugin({
      template: "./src/client/index.html",
      filename: "index.html"
    }),
    new webpack.ProvidePlugin({
      React: "react",
      $: "jquery",
      ReactDOM: "react-dom"
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development"
      ),
      "process.env.BROWSER": JSON.stringify(true)
    })
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      assets: path.resolve(__dirname, "src/assets"),
      client: path.resolve(__dirname, "src/client"),
      server: path.resolve(__dirname, "src/server")
    }
  },
  node: {
    module: "empty",
    fs: "empty"
  }
};
