const nodeExternals = require("webpack-node-externals"),
  path = require("path"),
  srcPath = path.resolve(__dirname),
  distPath = path.resolve(__dirname, "dist"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

const production =
  process.env.NODE_ENV && process.env.NODE_ENV === "production";
const Dotenv = require("dotenv-webpack");
if (!production) {
  require("dotenv").config();
}

const modeWebpack = production ? "production" : "development";

module.exports = {
  context: srcPath,
  entry: "./src/server/server.js",
  output: {
    path: distPath,
    filename: "server.js",
    publicPath: "/dist/"
  },
  target: "node",
  mode: modeWebpack,
  node: {
    __dirname: false,
    __filename: false
  },
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
              plugins: ["transform-object-rest-spread"]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
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
    })
    // new HtmlWebPackPlugin({
    //     template: "./src/index.html",
    //     filename: "./index.html"
    // }),
    // new webpack.DefinePlugin({
    //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    // }),
  ],
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      assets: path.resolve(__dirname, "src/assets"),
      client: path.resolve(__dirname, "src/client"),
      server: path.resolve(__dirname, "src/server")
    }
  },
  externals: nodeExternals(),
  devtool: "source-map"
};
