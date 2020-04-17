const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base.js')

module.exports = webpackMerge(baseConfig, {
    devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist',
        compress: true,
        hot: true
    }
})