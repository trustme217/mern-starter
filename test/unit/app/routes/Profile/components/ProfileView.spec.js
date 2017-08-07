import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'

import ProfileView from 'App/routes/Profile/components/ProfileView'

describe('<ProfileView />', () => {
  let props

  beforeEach(() => {
    props = {
      error: '',
      onSubmit: () => {},
    }
  })

  it('should disable submit button when validation fails', () => {
    const wrapper = shallow(<ProfileView {...props} />)

    wrapper.setState({
      password: '',
      confirmPassword: '',
    })

    expect(wrapper.find('[type="submit"]').prop('disabled')).toExist()

    wrapper.setState({
      password: 'password-1',
      confirmPassword: 'password-2',
    })

    expect(wrapper.find('[type="submit"]').prop('disabled')).toExist()
  })

  it('should enable submit button when validation succeeds', () => {
    const wrapper = shallow(<ProfileView {...props} />)
    wrapper.setState({
      password: 'same password',
      confirmPassword: 'same password',
    })
    expect(wrapper.find('[type="submit"]').prop('disabled')).toNotExist()
  })

  it('should invoke onSubmit callback', () => {
    const spy = expect.spyOn(props, 'onSubmit')

    const wrapper = shallow(<ProfileView {...props} />)

    const password = 'password'
    wrapper.setState({
      password,
      confirmPassword: password,
    })

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
    })

    expect(spy.calls.length).toBe(1)
    expect(spy.calls[0].arguments).toEqual([password])

    spy.restore()
    expect.restoreSpies()
  })
})
