require('babel-register')({
  only: [/app/, /config/, /server/, /test/],
})
require('babel-polyfill')
require('isomorphic-fetch')

const hook = require('css-modules-require-hook')
const cssModulesConfig = require('../../config/css-modules.config')

hook(cssModulesConfig)

// FIXME: require.extensions is deprecated.
require.extensions['.png'] = () => {}
