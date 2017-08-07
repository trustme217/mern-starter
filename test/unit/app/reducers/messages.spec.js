import expect from 'expect'

import { SHOW_MESSAGE, HIDE_MESSAGE } from 'App/actions/types'
import reducer from 'App/reducers/messages'

describe('Messages reducer', () => {
  const initialState = []
  const message = {
    messageId: 'message-id',
    message: 'message',
  }

  it('should return the initial state', () => {
    expect(
      reducer(undefined, {}) // eslint-disable-line comma-dangle
    ).toEqual(initialState)
  })

  it('should handle SHOW_MESSAGE', () => {
    expect(
      reducer(undefined, {
        type: SHOW_MESSAGE,
        ...message,
      }) // eslint-disable-line comma-dangle
    ).toEqual([message])
  })

  it('should handle HIDE_MESSAGE', () => {
    expect(
      reducer(undefined, {
        type: HIDE_MESSAGE,
        messageId: message.messageId,
      }) // eslint-disable-line comma-dangle
    ).toEqual(initialState)
  })
})
