import React from 'react'
import Route from 'react-router/lib/Route'
import IndexRoute from 'react-router/lib/IndexRoute'
import CoreLayout from 'App/components/CoreLayout'
import Home from './Home'
import Feature from './Feature'
import Login from './Login'
import Profile from './Profile'
import User from './User'
import NotFound from './NotFound'

export default (store) => {
  const requireGuest = (nextState, replace, callback) => {
    const { user } = store.getState()
    if (user) {
      replace({
        pathname: '/profile',
      })
    }
    callback()
  }

  const requireAuth = (nextState, replace, callback) => {
    const { user } = store.getState()
    if (!user) {
      replace({
        pathname: '/login',
      })
    }
    callback()
  }

  const requireAdmin = (nextState, replace, callback) => {
    const { user } = store.getState()
    if (!user || !user.isAdmin) {
      replace({
        pathname: '/',
      })
    }
    callback()
  }

  return (
    <Route path="/" component={CoreLayout}>
      <IndexRoute component={Home} />
      <Route path="features" component={Feature} />
      <Route path="login" component={Login} onEnter={requireGuest} />
      <Route onEnter={requireAuth}>
        <Route path="profile" component={Profile} />
        <Route path="users" onEnter={requireAdmin}>
          <IndexRoute component={User.List} />
          <Route path="add" component={User.Edit} />
          <Route path=":id" component={User.Edit} />
        </Route>
      </Route>
      <Route path="*" component={NotFound} />
    </Route>
  )
}
