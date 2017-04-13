"use strict";

const path = require("path");
const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const precss = require("precss");
const autoprefixer = require("autoprefixer");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const loaders = require("./webpack.config.loaders")();



loaders.push({
    test: /\.s?css$/,
    loader: ExtractTextPlugin.extract({
        fallback: "style-loader",
        loader: ["css-loader?minimize", "postcss-loader", "sass-loader"]
    })
});

module.exports = {
    devtool: "source-map",
    entry: {
        app: path.resolve(__dirname, "public", "main.js"),
        vendor: ["babel-polyfill", "eventsource-polyfill"]
    },

    output: {
        filename: path.join("js", "[chunkhash].js"),
        path: path.resolve(__dirname, "dist")
    },
    watch: true,

    module: {
        loaders,
    },

    plugins: [
        new CleanWebpackPlugin(["dist"]),
        // new webpack.optimize.UglifyJsPlugin({
        //     sourceMap: true,
        //     beautify: false,
        //     comments: false,
        //     compress: {
        //         sequences: true,
        //         booleans: true,
        //         loops: true,
        //         unused: true,
        //         warnings: false,
        //         drop_console: true,
        //         unsafe: true
        //     }
        // }),
        new HtmlPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "public/index.html")
        }),
        new ExtractTextPlugin(path.join("css", "[name].bundle.[hash].css")),

        new CopyWebpackPlugin(
            [
                {
                    from: path.join(__dirname, "public","img"),
                    to: path.join(__dirname, "dist", "img")
                },
                {
                    from: path.join(__dirname, "public","textures"),
                    to: path.join(__dirname, "dist", "textures")
                }
            ]
        ),
        new webpack.LoaderOptionsPlugin({
            debug: true,
            postcss: [precss, autoprefixer]
        })
    ]
};
