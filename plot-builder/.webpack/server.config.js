'use strict'

const nodeExternals = require('webpack-node-externals')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'sourcemap',
  context: path.resolve(__dirname, '..'),
  target: 'node',
  externals: [nodeExternals()],
  entry: './src/server',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    modules: [path.resolve(__dirname, '../src/lib'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: /(src)/
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/\.css$/),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false
    })
  ]
}
