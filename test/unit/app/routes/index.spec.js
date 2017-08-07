import expect from 'expect'
import match from 'react-router/lib/match'
import createMemoryHistory from 'react-router/lib/createMemoryHistory'
import configStore from 'redux-mock-store'

import createRoutes from 'App/routes'
import CoreLayout from 'App/components/CoreLayout'
import Home from 'App/routes/Home'
import Feature from 'App/routes/Feature'
import Login from 'App/routes/Login'
import Profile from 'App/routes/Profile'
import User from 'App/routes/User'
import NotFound from 'App/routes/NotFound'

describe('Routes', () => {
  const createLocation = createMemoryHistory().createLocation
  const mockStore = configStore()

  let routes
  beforeEach(() => {
    const store = mockStore()
    routes = createRoutes(store)
  })

  describe('Route /', () => {
    it('should render Home', (done) => {
      match({ routes, location: createLocation('/') }, (err, redirectLocation, renderProps) => {
        expect(renderProps).toExist()
        expect(renderProps.routes.length).toBe(2)
        expect(renderProps.routes[0].component).toEqual(CoreLayout)
        expect(renderProps.routes[1].component).toEqual(Home)
        done()
      })
    })
  })

  describe('Route /features', () => {
    it('should render Feature', (done) => {
      match({ routes, location: createLocation('/features') }, (err, redirectLocation, renderProps) => {
        expect(renderProps).toExist()
        expect(renderProps.routes.length).toBe(2)
        expect(renderProps.routes[1].component).toEqual(Feature)
        done()
      })
    })
  })

  describe('Route /login', () => {
    const location = createLocation('/login')

    it('should render Login', (done) => {
      match({ routes, location }, (err, redirectLocation, renderProps) => {
        expect(renderProps).toExist()
        expect(renderProps.routes.length).toBe(2)
        expect(renderProps.routes[1].component).toEqual(Login)
        done()
      })
    })

    it('should redirect to /profile for logged in users', (done) => {
      const store = mockStore({
        user: {
          username: 'username',
        },
      })
      routes = createRoutes(store)

      match({ routes, location }, (err, redirectLocation) => {
        expect(redirectLocation).toExist()
        expect(redirectLocation.pathname).toBe('/profile')
        done()
      })
    })
  })

  describe('Route /profile', () => {
    const location = createLocation('/profile')

    it('should redirect to /login for guests', (done) => {
      match({ routes, location }, (err, redirectLocation) => {
        expect(redirectLocation).toExist()
        expect(redirectLocation.pathname).toBe('/login')
        done()
      })
    })

    it('should render Profile', (done) => {
      const store = mockStore({
        user: {
          username: 'username',
        },
      })
      routes = createRoutes(store)

      match({ routes, location }, (err, redirectLocation, renderProps) => {
        expect(renderProps).toExist()
        expect(renderProps.routes.length).toBe(3)
        expect(renderProps.routes[2].component).toEqual(Profile)
        done()
      })
    })
  })

  describe('Route /users', () => {
    const location = createLocation('/users')

    it('should redirect to /login for guests', (done) => {
      match({ routes, location }, (err, redirectLocation) => {
        expect(redirectLocation).toExist()
        expect(redirectLocation.pathname).toBe('/login')
        done()
      })
    })

    it('should redirect to / for non-admin users', (done) => {
      const store = mockStore({
        user: {
          username: 'username',
          isAdmin: false,
        },
      })
      routes = createRoutes(store)

      match({ routes, location }, (err, redirectLocation) => {
        expect(redirectLocation).toExist()
        expect(redirectLocation.pathname).toBe('/')
        done()
      })
    })

    it('should render User.List', (done) => {
      const store = mockStore({
        user: {
          username: 'username',
          isAdmin: true,
        },
      })
      routes = createRoutes(store)

      match({ routes, location }, (err, redirectLocation, renderProps) => {
        expect(renderProps).toExist()
        expect(renderProps.routes.length).toBe(4)
        expect(renderProps.routes[3].component).toEqual(User.List)
        done()
      })
    })

    describe('Route /users/add', () => {
      const userLocation = createLocation('/users/add')

      it('should render User.Edit', (done) => {
        const store = mockStore({
          user: {
            username: 'username',
            isAdmin: true,
          },
        })
        routes = createRoutes(store)

        match({ routes, location: userLocation }, (err, redirectLocation, renderProps) => {
          expect(renderProps).toExist()
          expect(renderProps.routes.length).toBe(4)
          expect(renderProps.routes[3].component).toEqual(User.Edit)
          done()
        })
      })
    })

    describe('Route /users/:id', () => {
      const userLocation = createLocation('/users/some-user-id')

      it('should render User.List', (done) => {
        const store = mockStore({
          user: {
            username: 'username',
            isAdmin: true,
          },
        })
        routes = createRoutes(store)

        match({ routes, location: userLocation }, (err, redirectLocation, renderProps) => {
          expect(renderProps).toExist()
          expect(renderProps.routes.length).toBe(4)
          expect(renderProps.routes[3].component).toEqual(User.Edit)
          done()
        })
      })
    })
  })

  describe('Unknown route', () => {
    it('should render NotFound', (done) => {
      match({ routes, location: createLocation('/unknown-route') }, (err, redirectLocation, renderProps) => {
        expect(renderProps).toExist()
        expect(renderProps.routes.length).toBe(2)
        expect(renderProps.routes[1].component).toEqual(NotFound)
        done()
      })
    })
  })
})
