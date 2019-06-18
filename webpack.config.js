"use strict";

const path = require('path');
const Webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
    const isDevelopementMode = !!(env && env.dev);

    return {
        entry: !isDevelopementMode ? './src/index.ts' : './src/_dev/index.ts',
        module: {
            rules: [
                {
                    test: /\.(ts)$/,
                    use: [{
                        loader: 'awesome-typescript-loader',
                        options: {silent: true}
                    }],
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['*', '.ts', '.js']
        },
        output: {
            path: path.join(__dirname, './dist'),
            filename: 'index.js',
            library: 'ReduxSolid',
            libraryTarget: "umd"
        },
        devServer: {
            contentBase: './src/_dev',
            hot: true
        },
        plugins: [env.dev ? new Webpack.HotModuleReplacementPlugin() : new UglifyJsPlugin()]
    };

};