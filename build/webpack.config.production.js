const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

module.exports = webpackMerge(baseConfig, {
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~', // 分割符
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
})
