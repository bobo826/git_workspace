const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'admin-master',
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new CleanWebpackPlugin(['dist']),
        //打包生产包时去除
        new webpack.DefinePlugin({
            "process.env": {
            NODE_ENV: JSON.stringify("production")
            }
        })
    ],
    //devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        //react-router-dom使用BrowserRouter进行路由跳转必须声明historyApiFallback为ture，否则无法渲染
        historyApiFallback:true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
};