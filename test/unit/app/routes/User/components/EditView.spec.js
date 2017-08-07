import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'

import EditView from 'App/routes/User/components/EditView'
import { USER_TYPE_USER } from 'Server/constants'

describe('<EditView />', () => {
  let props

  beforeEach(() => {
    props = {
      user: {
        username: 'username',
        password: 'password',
        type: USER_TYPE_USER,
      },
      error: '',
      onSubmit: () => {},
    }
  })

  it('should disable submit button when validation fails', () => {
    const user = {
      username: '',
      password: '',
      type: 'some-invalid-user-type',
    }

    const wrapper = shallow(<EditView {...props} user={user} />)
    expect(wrapper.find('[type="submit"]').prop('disabled')).toExist()
  })

  it('should enable submit button when validation succeeds', () => {
    const wrapper = shallow(<EditView {...props} />)
    expect(wrapper.find('[type="submit"]').prop('disabled')).toNotExist()
  })

  it('should invoke onSubmit callback', () => {
    const spy = expect.spyOn(props, 'onSubmit')

    const wrapper = shallow(<EditView {...props} />)

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    })

    expect(spy.calls.length).toBe(1)
    expect(spy.calls[0].arguments).toEqual([props.user])

    spy.restore()
    expect.restoreSpies()
  })
})
