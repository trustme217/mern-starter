import expect from 'expect'

import { LOGIN_USER, LOGOUT_USER } from 'App/actions/types'
import reducer from 'App/reducers/user'

describe('User reducer', () => {
  const initialState = null

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}) // eslint-disable-line comma-dangle
    ).toEqual(initialState)
  })

  it('should handle LOGIN_USER', () => {
    const user = {
      username: 'username',
    }

    expect(
      reducer(undefined, {
        type: LOGIN_USER,
        user,
      }) // eslint-disable-line comma-dangle
    ).toEqual(user)
  })

  it('should handle LOGOUT_USER', () => {
    expect(
      reducer(undefined, {
        type: LOGOUT_USER,
      }) // eslint-disable-line comma-dangle
    ).toEqual(initialState)
  })
})
