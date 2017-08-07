import expect from 'expect'
import { put, call } from 'redux-saga/effects'
import { loadUsersRequest, addUserRequest, getUserRequest, updateUserRequest, deleteUserRequest } from 'App/sagas/users'
import { loadUsers, addUser, getUser, updateUser, deleteUser } from 'App/actions/users'
import * as Api from 'App/services/users'

describe('Users sagas', () => {
  describe('loadUsersRequest', () => {
    it('should dispatch LOAD_USERS with users retrieved', (done) => {
      const users = [
        {
          username: 'username',
          type: 'user-type',
        },
      ]

      const generator = loadUsersRequest()

      let next = generator.next()
      expect(next.value).toEqual(call(Api.loadUsers))

      next = generator.next(users)
      expect(next.value).toEqual(put(loadUsers(users)))

      done()
    })
  })

  describe('addUserRequest', () => {
    it('should dispatch ADD_USER with new user added', (done) => {
      const user = {
        username: 'username',
        password: 'password',
        type: 'user-type',
      }

      const generator = addUserRequest({
        user,
      })

      let next = generator.next()
      expect(next.value).toEqual(call(Api.addUser, user))

      next = generator.next(user)
      expect(next.value).toEqual(put(addUser(user)))

      done()
    })
  })

  describe('getUserRequest', () => {
    it('should dispatch GET_USER with user retrieved', (done) => {
      const id = 'some-user-id'
      const user = {
        username: 'username',
        type: 'user-type',
      }

      const generator = getUserRequest({
        id,
      })

      let next = generator.next()
      expect(next.value).toEqual(call(Api.getUser, id))

      next = generator.next(user)
      expect(next.value).toEqual(put(getUser(user)))

      done()
    })
  })

  describe('updateUserRequest', () => {
    it('should dispatch UPDATE_USER with user updated', (done) => {
      const id = 'some-user-id'
      const user = {
        password: 'password',
        type: 'user-type',
      }

      const generator = updateUserRequest({
        id,
        user,
      })

      let next = generator.next()
      expect(next.value).toEqual(call(Api.updateUser, id, user))

      next = generator.next(user)
      expect(next.value).toEqual(put(updateUser(id, user)))

      done()
    })
  })

  describe('deleteUserRequest', () => {
    it('should dispatch DELETE_USER with user Id deleted', (done) => {
      const id = 'some-user-id'

      const generator = deleteUserRequest({
        id,
      })

      let next = generator.next()
      expect(next.value).toEqual(call(Api.deleteUser, id))

      next = generator.next(id)
      expect(next.value).toEqual(put(deleteUser(id)))

      done()
    })
  })
})
