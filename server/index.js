import hook from 'css-modules-require-hook'
import cssModulesConfig from 'Config/css-modules.config'
import projectConfig from 'Config/project.config'
import createServer from './server'
import seed from './seed'

hook(cssModulesConfig)

if (projectConfig.globals.__DEV__) {
  // FIXME: require.extensions is deprecated.
  require.extensions['.png'] = () => {}
}

const server = createServer()

server.listen(server.get('port'), () => {
  console.log(`Server listening on port ${server.get('port')}.`)
  seed()
})
