const webpack = require('webpack')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

const version = '1.0.0'

const webpackConfig = {
  mode: 'production',
  entry: {
    navigator: path.resolve(__dirname, '../src/component/navigator/navigator.js')
  },
  output: {
    path: path.resolve(__dirname, '../navigator'),
    filename: `[name].${version}.js`
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new StyleLintPlugin({
      files: ['**/*.{vue,htm,html,css,sss,less,scss,sass}']
    })
  ],
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
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

const complier = webpack(webpackConfig)

complier.run((err, stats) => {
  if (err) {
    console.error(err.stack || err)
    if (err.details) {
      console.error(err.details)
    }
    return
  }

  const info = stats.toJson()

  if (stats.hasErrors()) {
    console.error(info.errors)
  }

  if (stats.hasWarnings()) {
    console.warn(info.warnings)
  }
})
