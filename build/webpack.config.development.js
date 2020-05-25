const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')
const config = require('./config.js')
const path = require('path')

module.exports = webpackMerge(baseConfig, {
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../'),
    compress: true,
    hot: true, // 热替换，好处是不用完全刷新页面，而是局部刷新，可以保留页面状态
    inline: true,
    // overlay: {
    //   warnings: true,
    //   errors: true
    // },
    port: 8888,
    host: '127.0.0.1',
    openPage: `${config.development.publicPath.slice(1)}index.html`,
    proxy: {
      // '/ad': 'http://127.0.0.1:3000'
    }
  }
})
