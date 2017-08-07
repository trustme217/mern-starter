import React from 'react'
import configStore from 'redux-mock-store'
import { shallow } from 'enzyme'
import expect from 'expect'

import MessageBox from 'App/components/MessageBox'
import Message from 'App/components/MessageBox/Message'

describe('<MessageBox />', () => {
  const mockStore = configStore()

  it('should render messages', () => {
    const messages = [
      {
        messageId: 'message-id-1',
        message: 'message-1',
      },
      {
        messageId: 'message-id-2',
        message: 'message-2',
      },
    ]

    const store = mockStore({
      messages,
    })

    const wrapper = shallow(<MessageBox store={store} />).shallow()
    expect(wrapper.find(Message).length).toBe(messages.length)
  })
})
