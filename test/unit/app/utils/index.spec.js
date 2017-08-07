import expect from 'expect'
import { filterDate, filterUserType } from 'App/utils'
import { USER_TYPE_ADMIN, USER_TYPE_USER } from 'Server/constants'

describe('Utils', () => {
  describe('filterDate', () => {
    it('should format date in YYYY-MM-DD', (done) => {
      expect(filterDate('2017-02-14T15:55:45.336Z')).toBe('2017-2-14')
      done()
    })
  })

  describe('filterUserType', () => {
    it('should return friendly representation', (done) => {
      expect(filterUserType(USER_TYPE_ADMIN)).toBe('Administrator')
      expect(filterUserType(USER_TYPE_USER)).toBe('User')
      expect(filterUserType('unknown-user-type')).toBe('')
      done()
    })
  })
})
