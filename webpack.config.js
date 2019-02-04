const path = require('path'),
    webpack = require('webpack'),
    srcPath = path.resolve(__dirname),
    distPath = path.resolve(__dirname, 'dist'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");
// const PUBLIC_DIR = path.resolve(__dirname, 'dist');
const production = process.env.NODE_ENV &&
    process.env.NODE_ENV === "production";
const Dotenv = require('dotenv-webpack');
if (!production) {
    require('dotenv').config();
}

const modeWebpack = production ?
    "production" :
    "development";

module.exports = {
    // context: distPath,
    entry: {
        app: './src/client/index.js',
    },
     output: {
        filename: 'client.js',
        path: distPath,
        publicPath: '/dist/',
        
    },
    mode: modeWebpack,
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                        plugins: ['transform-object-rest-spread', 'async-to-promises']
                    }
                }],
            }, {
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
        // new HtmlWebPackPlugin({
        //     template: "./src/index.html",
        //     filename: "./index.html"
        // }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.BROWSER': JSON.stringify(true),
        }),
    ],
    resolve: {
        alias: {
            src: path.resolve(__dirname, "src"),
            assets: path.resolve(__dirname, "src/assets"),
            client: path.resolve(__dirname, "src/client"),
        }
    },
    node: {
        module: 'empty',
        fs: 'empty'
    }
}