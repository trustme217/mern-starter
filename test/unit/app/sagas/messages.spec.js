import expect from 'expect'
import { delay } from 'redux-saga'
import { put, call } from 'redux-saga/effects'
import { showMessageRequest } from 'App/sagas/messages'
import { showMessage, hideMessage } from 'App/actions/messages'

describe('Messages sagas', () => {
  describe('showMessageRequest', () => {
    it('should dispatch SHOW_MESSAGE and HIDE_MESSAGE', (done) => {
      const message = 'message'
      const generator = showMessageRequest({
        message,
        timeout: 0,
      })

      let next = generator.next()
      expect(next.value).toEqual(put(showMessage(1, message)))

      next = generator.next()
      expect(next.value).toEqual(call(delay, 3000))

      next = generator.next()
      expect(next.value).toEqual(put(hideMessage(1)))

      done()
    })
  })
})
