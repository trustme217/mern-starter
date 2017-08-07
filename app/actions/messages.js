import * as types from './types'

export const showMessageRequest = message => ({
  type: types.SHOW_MESSAGE_REQUEST,
  message,
})

export const showMessage = (messageId, message) => ({
  type: types.SHOW_MESSAGE,
  messageId,
  message,
})

export const hideMessage = messageId => ({
  type: types.HIDE_MESSAGE,
  messageId,
})
