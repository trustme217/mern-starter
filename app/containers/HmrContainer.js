import projectConfig from 'Config/project.config'

export default (
  projectConfig.env === 'development'
    ? require('react-hot-loader').AppContainer // eslint-disable-line
    : ({ children }) => (children)
)
