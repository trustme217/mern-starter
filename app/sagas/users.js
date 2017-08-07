import { call, put, takeEvery } from 'redux-saga/effects'
import browserHistory from 'react-router/lib/browserHistory'
import { loadUsers, addUser, getUser, updateUser, deleteUser } from 'App/actions/users'
import { showMessageRequest } from 'App/actions/messages'
import * as Api from 'App/services/users'
import * as types from 'App/actions/types'

export function* loadUsersRequest() {
  try {
    const users = yield call(Api.loadUsers)
    yield put(loadUsers(users))
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}

export function* addUserRequest(action) {
  try {
    const user = yield call(Api.addUser, action.user)
    yield put(addUser(user))
    yield put(showMessageRequest('User is added successfully.'))
    yield call(browserHistory.push, '/users')
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}

export function* getUserRequest(action) {
  try {
    const user = yield call(Api.getUser, action.id)
    yield put(getUser(user))
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}

export function* updateUserRequest(action) {
  try {
    const user = yield call(Api.updateUser, action.id, action.user)
    yield put(updateUser(action.id, user))
    yield put(showMessageRequest('User is updated successfully.'))
    yield call(browserHistory.push, '/users')
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}


export function* deleteUserRequest(action) {
  try {
    yield call(Api.deleteUser, action.id)
    yield put(deleteUser(action.id))
    yield put(showMessageRequest('User is deleted successfully.'))
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}

export function* watchLoadUsersRequest() {
  yield takeEvery(types.LOAD_USERS_REQUEST, loadUsersRequest)
}

export function* watchAddUserRequest() {
  yield takeEvery(types.ADD_USER_REQUEST, addUserRequest)
}

export function* watchGetUserRequest() {
  yield takeEvery(types.GET_USER_REQUEST, getUserRequest)
}

export function* watchUpdateUserRequest() {
  yield takeEvery(types.UPDATE_USER_REQUEST, updateUserRequest)
}

export function* watchDeleteUserRequest() {
  yield takeEvery(types.DELETE_USER_REQUEST, deleteUserRequest)
}
