import { fetchGet, fetchPost } from './helpers'

export const loginUser = (username, password) => (
  new Promise((resolve, reject) => {
    fetchPost('/login', {
      username,
      password,
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
        response.json().then((user) => {
          resolve(user)
        })
      }
    })
  })
)

export const logoutUser = () => (
  new Promise((resolve) => {
    fetchGet('/logout').then(() => {
      resolve()
    })
  })
)

export const changePassword = password => (
  new Promise((resolve, reject) => {
    fetchPost('/profile/password', {
      password,
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
        resolve()
      }
    })
  })
)
