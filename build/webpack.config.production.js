const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

module.exports = webpackMerge(baseConfig, {
  // devtool: 'source-map',
  output: {
    pathinfo: false // 关闭输出路径信息路径信息
  },
  optimization: {
    moduleIds: 'hashed', // 模块 id 跟顺序有关，为了保证 moduleId 不变，这里使用 hashed
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: 'single'
  }
})
