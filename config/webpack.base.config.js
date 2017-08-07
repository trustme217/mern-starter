const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const projectConfig = require('./project.config')

module.exports = {
  devtool: 'source-map',
  output: {
    filename: '[name].js',
    path: projectConfig.paths.dist(),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract([
          'css-loader?modules&importLoaders=1&sourceMap&localIdentName=[path]-[name]-[local]-[hash:base64:5]',
          'postcss-loader?config=./config/postcss.config.js',
          'sass-loader?sourceMap&outputStyle=expanded'])
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': projectConfig.globals.__DEV__ ? '"development"' : '"production"',
    }),
  ],
  resolve: {
    alias: {
      App: projectConfig.paths.app(),
      Config: projectConfig.paths.config(),
      Public: projectConfig.paths.public(),
      Server: projectConfig.paths.server(),
    },
  }
}
