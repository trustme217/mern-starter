import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUserRequest } from 'App/actions/user'
import LoginView from '../components/LoginView'

class LoginContainer extends Component {
  static propTypes = {
    loginUserRequest: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.handlSubmit = this.handlSubmit.bind(this)
  }

  handlSubmit(username, password) {
    this.props.loginUserRequest(username, password)
  }

  render() {
    return (
      <LoginView
        onSubmit={this.handlSubmit}
      />
    )
  }
}

export default connect(undefined, { loginUserRequest })(LoginContainer)
