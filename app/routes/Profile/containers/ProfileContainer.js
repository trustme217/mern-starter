import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { changePasswordRequest } from 'App/actions/user'
import ProfileView from '../components/ProfileView'

class ProfileContainer extends Component {
  static propTypes = {
    changePasswordRequest: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.handlSubmit = this.handlSubmit.bind(this)
  }

  handlSubmit(password) {
    this.props.changePasswordRequest(password)
  }

  render() {
    return (
      <ProfileView
        onSubmit={this.handlSubmit}
      />
    )
  }
}

export default connect(undefined, { changePasswordRequest })(ProfileContainer)
