const webpack = require('webpack')
const extend  = require('extend')
const projectConfig = require('./project.config')
const baseConfig = require('./webpack.base.config')

let entry
let plugins

if (projectConfig.globals.__DEV__) {
  entry = [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    projectConfig.paths.app('index.js'),
  ]

  plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 'Infinity',
      filename: 'vendor.js',
    }),
  ]
} else {
  entry = [
    'babel-polyfill',
    projectConfig.paths.app('index.js'),
  ]

  plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 'Infinity',
      filename: 'vendor.js',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ]
}

module.exports = extend(true, {}, baseConfig, {
  entry: {
    app: entry,
    vendor: [
      'react',
      'react-dom',
    ],
  },
  plugins: baseConfig.plugins.concat(plugins),
})
