const sass = require('node-sass')
const projectConfig = require('./project.config')

module.exports = {
  devMode: projectConfig.globals.__DEV__,
  generateScopedName: '[path]-[name]-[local]-[hash:base64:5]',
  extensions: ['.scss'],
  preprocessCss: (data, file) =>
    sass.renderSync({
      data,
      file,
    }).css,
}
