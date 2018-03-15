const path = require('path')
const webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    vendor: [
      'qs',
      'axios',
      'vue/dist/vue.esm.js',
      'vue-awesome',
      'vue-router',
      'vuex',
      'vue-particles',
      'vue-scroll',
      'element-ui'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!(autotrack|dom-utils))/
      }
    ]
  },
  plugins: [
    // 实现vendor 文件 体积拆分
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
    new webpack.DllPlugin({
      context: path.resolve(__dirname, '..'),
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      libraryTarget: 'commonjs2',
      name: '[name]_library'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        drop_debugger: true
      }
    })
  ]
}