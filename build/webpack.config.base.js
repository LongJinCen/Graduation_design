const files = require('../src/const/page.js')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const env = process.env.NODE_ENV
const config = require('./config.js')

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
    }))
});

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
                            ),
                            presets: [
                                [
                                    "@babel/env",
                                    {
                                        targets: {
                                            edge: 17,
                                            firefox: 60,
                                            chrome: 58,
                                            safari: 11.1,
                                            ie: 11
                                        }
                                    }
                                ],
                                ["@vue/babel-preset-jsx"]
                            ],
                            plugins: [
                                [
                                    "@babel/plugin-transform-runtime",
                                    {
                                        corejs: 3
                                    }
                                ]
                            ]
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