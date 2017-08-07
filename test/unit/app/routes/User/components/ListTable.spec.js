import React from 'react'
import { shallow } from 'enzyme'
import expect from 'expect'

import ListTable from 'App/routes/User/components/ListTable'
import ListItem from 'App/routes/User/components/ListItem'

import { USER_TYPE_ADMIN, USER_TYPE_USER } from 'Server/constants'

describe('<ListTable />', () => {
  it('should render table rows', () => {
    const users = [
      {
        _id: 'user-id-1',
        username: 'username-1',
        type: USER_TYPE_ADMIN,
        createdAt: '2017-02-14T15:55:45.336Z',
      },
      {
        _id: 'user-id-2',
        username: 'username-2',
        type: USER_TYPE_USER,
        createdAt: '2017-02-12T15:55:45.336Z',
      },
    ]

    const wrapper = shallow(<ListTable users={users} />).shallow()
    expect(wrapper.find(ListItem).length).toBe(users.length)
  })
})
