const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

module.exports = webpackMerge(baseConfig, {
  devtool: 'source-map'
})
