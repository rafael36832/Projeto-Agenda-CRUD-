const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    mode: 'development',
    entry: './frontEnd/index.js',
    output: {
        path: path.resolve(__dirname, 'public', 'assets', 'js'),
        filename: 'bundle.js'
    },
    module: {
            rules: [{
                exclude: /node_modules/,
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env']
                    }
                }},
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader']
                }
            ]
    },
    plugins: [].concat(devMode ? [] : [new MiniCssExtractPlugin()]),
    devtool: 'source-map'
}