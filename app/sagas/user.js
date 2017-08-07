import { call, put, takeEvery } from 'redux-saga/effects'
import browserHistory from 'react-router/lib/browserHistory'
import { loginUser, logoutUser } from 'App/actions/user'
import { showMessageRequest } from 'App/actions/messages'
import * as Api from 'App/services/user'
import * as types from 'App/actions/types'

export function* loginUserRuquest(action) {
  try {
    const user = yield call(Api.loginUser, action.username, action.password)
    yield put(loginUser(user))
    yield call(browserHistory.push, '/profile')
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}

export function* logoutUserRequest() {
  yield call(Api.logoutUser)
  yield put(logoutUser())
}

export function* changePassword(action) {
  try {
    yield call(Api.changePassword, action.password)
    yield put(showMessageRequest('Password is updated successfully.'))
  } catch (e) {
    yield put(showMessageRequest(e))
  }
}

export function* watchLoginUserRequest() {
  yield takeEvery(types.LOGIN_USER_REQUEST, loginUserRuquest)
}

export function* watchLogoutUserRequest() {
  yield takeEvery(types.LOGOUT_USER_REQUEST, logoutUserRequest)
}

export function* watchChangePasswordRequest() {
  yield takeEvery(types.CHANGE_PASSWORD_REQUEST, changePassword)
}
