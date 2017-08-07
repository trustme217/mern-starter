import express from 'express'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware' // eslint-disable-line import/no-extraneous-dependencies
import webpackHotMiddleware from 'webpack-hot-middleware' // eslint-disable-line import/no-extraneous-dependencies

import webpackAppConfig from 'Config/webpack.app.config'

export default () => {
  const router = new express.Router()

  const compiler = webpack(webpackAppConfig)

  router.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    lazy: false,
    publicPath: webpackAppConfig.output.publicPath,
  }))

  router.use(webpackHotMiddleware(compiler, {
    path: '/__webpack_hmr',
    heartbeat: 10000,
  }))

  return router
}
