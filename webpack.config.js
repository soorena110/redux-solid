"use strict";

const path = require('path');
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
            extensions: ['*', '.ts']
        },
        output: {
            path: path.join(__dirname, !isDevelopementMode ? './lib' : './src/_dev/js'),
            filename: 'index.js',
            library: 'ReducerCreator',
            libraryTarget: "umd"
        },
        plugins: [new UglifyJsPlugin()]
    };

};