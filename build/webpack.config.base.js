const files = require('../src/const/page.js')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')
const webpack = require('webpack')
const config = require('./config.js')
const DefinePlugin = require('webpack/lib/DefinePlugin')

const env = process.env.NODE_ENV

const entry = {}
const htmlPlugin = []
Object.keys(files).forEach(file => {
  entry[file] = path.resolve(__dirname, '../', files[file].path)
  htmlPlugin.push(new HtmlWebpackPlugin({
    title: files[file].title,
    filename: `${file}.html`,
    template: `./templete/templete.${env}.html`,
    inject: false,
    chunks: [file],
    file: file
  }))
})
module.exports = {
  mode: env,
  entry: entry,
  output: {
    publicPath: config[env].publicPath,
    path: path.resolve(__dirname, '../dist'),
    filename: `[name].[${env === 'development' ? 'hash' : 'contenthash'}].js`,
    chunkFilename: `[id].[${env === 'development' ? 'hash' : 'contenthash'}].js`
  },
  plugins: [
    ...htmlPlugin,
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new StyleLintPlugin({
      files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}']
    }),
    new ManifestPlugin(),
    new webpack.DllReferencePlugin({
      manifest: require('../build/main-manifest.json')
    }),
    new DefinePlugin({ // webpack4 开始指定了 mode 后悔自动利用该插件配置 process.env.Node_env
      // 定义 NODE_ENV 环境变量为 production, 这样可以再项目中直接访问 process.env 变量
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
        test: /\.js$/i,
        use: [
          {
            loader: 'babel-loader',
            options: {
              exclude: file => (
                /node_modules/.test(file) &&
                                !/\.vue\.js/.test(file)
              )
            }
          }
        ]
      },
      {
        test: /\.vue$/i,
        loader: 'vue-loader'
      },
      {
        test: /\.less$/i,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'less-loader',
          'postcss-loader'
        ]
      },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  externals: {
    vue: 'Vue',
    'element-ui': 'element-ui'
  }
}
