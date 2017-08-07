import * as types from './types'

export const loadUsersRequest = () => ({
  type: types.LOAD_USERS_REQUEST,
})

export const loadUsers = users => ({
  type: types.LOAD_USERS,
  users,
})

export const addUserRequest = user => ({
  type: types.ADD_USER_REQUEST,
  user,
})

export const addUser = user => ({
  type: types.ADD_USER,
  user,
})

export const getUserRequest = id => ({
  type: types.GET_USER_REQUEST,
  id,
})

export const getUser = user => ({
  type: types.GET_USER,
  user,
})

export const updateUserRequest = (id, user) => ({
  type: types.UPDATE_USER_REQUEST,
  id,
  user,
})

export const updateUser = (id, user) => ({
  type: types.UPDATE_USER,
  id,
  user,
})

export const deleteUserRequest = id => ({
  type: types.DELETE_USER_REQUEST,
  id,
})

export const deleteUser = id => ({
  type: types.DELETE_USER,
  id,
})
