import expect from 'expect'
import { put, call } from 'redux-saga/effects'
import { loginUserRuquest, logoutUserRequest } from 'App/sagas/user'
import { loginUser, logoutUser } from 'App/actions/user'
import * as Api from 'App/services/user'

describe('User sagas', () => {
  describe('loginUserRuquest', () => {
    it('should dispatch LOGIN_USER', (done) => {
      const username = 'username'
      const password = 'password'
      const isAdmin = false

      const generator = loginUserRuquest({
        username,
        password,
      })

      let next = generator.next()
      expect(next.value).toEqual(call(Api.loginUser, username, password))

      next = generator.next({
        username,
        isAdmin,
      })
      expect(next.value).toEqual(
        put(loginUser({
          username,
          isAdmin,
        })) // eslint-disable-line comma-dangle
      )

      done()
    })
  })

  describe('logoutUserRuquest', () => {
    it('should dispatch LOGOUT_USER', (done) => {
      const generator = logoutUserRequest()

      let next = generator.next()
      expect(next.value).toEqual(call(Api.logoutUser))

      next = generator.next()
      expect(next.value).toEqual(put(logoutUser()))

      done()
    })
  })
})
