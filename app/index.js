import React from 'react'
import ReactDOM from 'react-dom'
import browserHistory from 'react-router/lib/browserHistory'
import Router from 'react-router/lib/Router'

import createStore from 'App/store'
import createRoutes from 'App/routes'
import HmrContainer from 'App/containers/HmrContainer'
import AppContainer from 'App/containers/AppContainer'

import projectConfig from 'Config/project.config'

import 'App/styles/app.scss'

const initialState = window.__INITIAL_STATE__
const store = createStore(initialState)

let routes = createRoutes(store)

const MOUNT_NODE = document.getElementById('root')

const render = () => {
  ReactDOM.render(
    <HmrContainer>
      <AppContainer store={store}>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </AppContainer>
    </HmrContainer>,
    MOUNT_NODE // eslint-disable-line comma-dangle
  )
}

if (projectConfig.globals.__DEV__) {
  if (module.hot) {
    module.hot.accept('App/routes', () => {
      routes = require('App/routes').default(store) // eslint-disable-line global-require
      render()
    })
  }
}

render()
