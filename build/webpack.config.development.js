const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const config = require('./config.js')

module.exports = webpackMerge(baseConfig, {
  devtool: 'eval-source-map',
  devServer: {
    contentBase: '../dist',
    compress: true,
    hot: true,
    inline: true,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 8888,
    host: '127.0.0.1',
    openPage: `${config.development.publicPath.slice(1)}index.html`
  }
})
