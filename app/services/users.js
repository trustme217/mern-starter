import { fetchGet, fetchPost, fetchPut, fetchDelete } from './helpers'

export const loadUsers = () => (
  new Promise((resolve, reject) => {
    fetchGet('/users').then((response) => {
      if (response.status !== 200) {
        response.json().then((json) => {
          let message = json.message
          if (Array.isArray(message)) {
            message = message.join()
          }
          reject(message)
        })
      } else {
        response.json().then((users) => {
          resolve(users)
        })
      }
    })
  })
)

export const addUser = user => (
  new Promise((resolve, reject) => {
    fetchPost('/users', {
      username: user.username,
      password: user.password,
      type: user.type,
    }).then((response) => {
      if (response.status !== 200) {
        response.json().then((json) => {
          let message = json.message
          if (Array.isArray(message)) {
            message = message.join()
          }
          reject(message)
        })
      } else {
        response.json().then((userAdded) => {
          resolve(userAdded)
        })
      }
    })
  })
)

export const getUser = id => (
  new Promise((resolve, reject) => {
    fetchGet(`/users/${id}`).then((response) => {
      if (response.status !== 200) {
        response.json().then((json) => {
          let message = json.message
          if (Array.isArray(message)) {
            message = message.join()
          }
          reject(message)
        })
      } else {
        response.json().then((user) => {
          resolve(user)
        })
      }
    })
  })
)

export const updateUser = (id, user) => (
  new Promise((resolve, reject) => {
    fetchPut(`/users/${id}`, {
      password: user.password,
      type: user.type,
    }).then((response) => {
      if (response.status !== 200) {
        response.json().then((json) => {
          let message = json.message
          if (Array.isArray(message)) {
            message = message.join()
          }
          reject(message)
        })
      } else {
        response.json().then((userUpdated) => {
          resolve(userUpdated)
        })
      }
    })
  })
)

export const deleteUser = id => (
  new Promise((resolve) => {
    fetchDelete(`/users/${id}`).then(() => {
      resolve(id)
    })
  })
)
