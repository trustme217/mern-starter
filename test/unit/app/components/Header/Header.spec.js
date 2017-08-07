import React from 'react'
import configStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import expect from 'expect'

import Header from 'App/components/Header'

describe('<Header />', () => {
  const mockStore = configStore()

  it('should render login link for guests', () => {
    const store = mockStore()
    const wrapper = shallow(<Header store={store} />).shallow()
    expect(wrapper.find({ to: '/login' }).length).toBe(1)
  })

  it('should not render login link for logged in users', () => {
    const store = mockStore({
      user: {
        username: 'username',
      },
    })
    const wrapper = shallow(<Header store={store} />).shallow()
    expect(wrapper.find({ to: '/login' }).length).toBe(0)
  })

  it('should not render users link for non-admin users', () => {
    const store = mockStore({
      user: {
        username: 'username',
        isAdmin: false,
      },
    })
    const wrapper = shallow(<Header store={store} />).shallow()
    expect(wrapper.find({ to: '/users' }).length).toBe(0)
  })

  it('should render users link for admin users', () => {
    const store = mockStore({
      user: {
        username: 'username',
        isAdmin: true,
      },
    })
    const wrapper = shallow(<Header store={store} />).shallow()
    expect(wrapper.find({ to: '/users' }).length).toBe(1)
  })
})
