const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    path: path.resolve(__dirname, '../dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, "../dist"),
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});