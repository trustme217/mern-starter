import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'

import LoginView from 'App/routes/Login/components/LoginView'

describe('<LoginView />', () => {
  let props

  beforeEach(() => {
    props = {
      error: '',
      onSubmit: () => {},
    }
  })

  it('should disable submit button when validation fails', () => {
    const wrapper = shallow(<LoginView {...props} />)
    wrapper.setState({
      username: '',
      password: '',
    })

    const submitButton = wrapper.find('[type="submit"]')
    expect(submitButton.prop('disabled')).toExist()
  })

  it('should enable submit button when validation succeeds', () => {
    const wrapper = shallow(<LoginView {...props} />)
    wrapper.setState({
      username: 'username',
      password: 'password',
    })

    const submitButton = wrapper.find('[type="submit"]')
    expect(submitButton.prop('disabled')).toNotExist()
  })

  it('should invoke onSubmit callback', () => {
    const spy = expect.spyOn(props, 'onSubmit')

    const wrapper = shallow(<LoginView {...props} />)

    const username = 'username'
    const password = 'password'
    wrapper.setState({
      username,
      password,
    })

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    })

    expect(spy.calls.length).toBe(1)
    expect(spy.calls[0].arguments).toEqual([username, password])

    spy.restore()
    expect.restoreSpies()
  })
})
