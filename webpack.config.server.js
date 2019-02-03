const nodeExternals = require('webpack-node-externals'),
    path = require('path'),
    srcPath = path.resolve(__dirname),
    distPath = path.resolve(__dirname, 'dist'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    context: srcPath,
    entry: './src/server/server.js',
    output: {
        path: distPath,
        filename: 'server.js'
    },
    target: 'node',
    mode: "production",
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015', 'react'],
                        plugins: ['transform-object-rest-spread']
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
    externals: nodeExternals(),
    devtool: 'source-map'
};