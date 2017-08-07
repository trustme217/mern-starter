const webpack  = require('webpack')
const extend  = require('extend')
const projectConfig = require('./project.config')
const baseConfig = require('./webpack.base.config')

module.exports = extend(true, {}, baseConfig, {
  entry: {
    server: [
      'babel-polyfill',
      projectConfig.paths.server('index.js'),
    ],
  },
  output: {
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  externals: [
    (context, request, callback) => {
      const isExternal =
        request.match(/^[@a-z][a-z/.\-0-9]*$/i) &&
        !request.match(/\.(css|scss)$/i)
      callback(null, Boolean(isExternal))
    },
  ],
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  plugins: baseConfig.plugins.concat([
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
  ]),
})
