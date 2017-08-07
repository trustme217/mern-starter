import React, { Component, PropTypes } from 'react'
import FormGroup from 'App/components/FormGroup'
import { getAllUserTypes } from 'App/utils'

class EditView extends Component {
  static propTypes = {
    isAdding: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = { ...this.props.user }

    this.userTypes = getAllUserTypes()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (!Object.is(this.props.user, nextProps.user)) {
      this.setState({ ...nextProps.user })
    }
  }

  validateUsername = (username) => {
    if (!username.length) {
      return 'Username is required.'
    }
    return true
  }

  validatePassword = (password) => {
    if (!password.length) {
      return 'Password is required.'
    }
    return true
  }

  validateType = (type) => {
    const index = this.userTypes.findIndex(option => option.value === type)
    if (index === -1) {
      return 'Type is invalid.'
    }
    return true
  }

  handleChange = field => (value) => {
    const nextState = {}
    nextState[field] = value
    this.setState(nextState)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    const { isAdding } = this.props
    const { username, password, type } = this.state

    const isUsernameValid = this.validateUsername(username)
    const isPasswordValid = this.validatePassword(password)
    const isTypeValid = this.validateType(type)
    const isSubmitDisabled =
      isUsernameValid !== true ||
      isPasswordValid !== true ||
      isTypeValid !== true

    return (
      <div className="row">
        <div className="col-sm-6 col-sm-offset-3">
          <div className="panel panel-default">
            <div className="panel-body">
              <form className="form-horizontal" onSubmit={this.handleSubmit}>
                {
                  isAdding && (
                    <FormGroup
                      id="username"
                      label="Username"
                      value={username}
                      validate={this.validateUsername}
                      onChange={this.handleChange('username')}
                    />
                  )
                }
                <FormGroup
                  type="password"
                  id="password"
                  label="Password"
                  value={password}
                  validate={this.validatePassword}
                  onChange={this.handleChange('password')}
                />
                <FormGroup
                  type="select"
                  id="type"
                  label="Type"
                  value={type}
                  options={this.userTypes}
                  validate={this.validateType}
                  onChange={this.handleChange('type')}
                />
                <div className="form-group no-margin-bottom">
                  <div className="col-sm-9 col-sm-offset-3">
                    <button type="submit" className="btn btn-default" disabled={isSubmitDisabled}>Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default EditView
