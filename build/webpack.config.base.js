const files = require('../src/const/page.js')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const env = process.env.NODE_ENV

const entry = {}
Object.keys(files).forEach(file => {
    entry[file] = path.resolve(__dirname, '../', files[file].path)
});

module.exports = {
    mode: env,
    entry: entry,
    output: {
        publicPath: 'http://127.0.0.1',
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[contenthash].js',
        chunkFilename: '[id].[contenthash].js'
    },
    plugins: [
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
                use: ['vue-style-loader', 'css-loader', 'less-loader']
            }
        ]
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src')
        }
    }
}