import * as types from 'App/actions/types'

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_USERS:
      return action.users
    case types.ADD_USER:
      return [
        ...state,
        action.user,
      ]
    case types.GET_USER:
      return [
        ...(state.filter(user => (user._id !== action.user._id))),
        action.user,
      ]
    case types.UPDATE_USER:
      return [
        ...(state.filter(user => (user._id !== action.id))),
        action.user,
      ]
    case types.DELETE_USER:
      return state.filter(user => (user._id !== action.id))
    default:
      return state
  }
}
