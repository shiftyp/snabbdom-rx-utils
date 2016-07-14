'use strict';

var webpack = require('webpack');

var config = {
  devtool: 'source-map',
  entry: './lib/index.js',
  module: {
    loaders: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }
    ]
  },
  output: {
    library: 'ObservableRouter',
    libraryTarget: 'umd',
    path: './browser',
    filename: 'observable-router.min.js'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  ]
};

module.exports = config;
