const path = require('path')

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8000,

  path_base: path.resolve(__dirname, '..'),
  dir_app: 'app',
  dir_config: 'config',
  dir_dist: 'dist',
  dir_public: 'public',
  dir_server: 'server',
}

config.globals = {
  '__DEV__': config.env === 'development',
  '__PROD__': config.env === 'production',
}

function base() {
  const args = [config.path_base].concat([].slice.call(arguments))
  return path.resolve.apply(path, args)
}

config.paths = {
  base: base,
  app: base.bind(null, config.dir_app),
  config: base.bind(null, config.dir_config),
  dist: base.bind(null, config.dir_dist),
  public: base.bind(null, config.dir_public),
  server: base.bind(null, config.dir_server),
}

module.exports = config
