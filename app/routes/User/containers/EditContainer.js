import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addUserRequest, getUserRequest, updateUserRequest } from 'App/actions/users'
import { USER_TYPE_USER } from 'Server/constants'
import EditView from '../components/EditView'

class EditContainer extends Component {
  static propTypes = {
    addUserRequest: PropTypes.func.isRequired,
    updateUserRequest: PropTypes.func.isRequired,
    getUserRequest: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.isAdding = props.params.id === undefined

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (!this.isAdding) {
      this.props.getUserRequest(this.props.params.id)
    }
  }

  handleSubmit(user) {
    if (this.isAdding) {
      this.props.addUserRequest(user)
    } else {
      this.props.updateUserRequest(this.props.params.id, user)
    }
  }

  render() {
    const { user } = this.props

    return (
      <div>
        <div className="page-header">
          <h2>
            {this.isAdding ? 'Add New User' : `Edit User - ${user.username}`}
          </h2>
        </div>
        <EditView
          isAdding={this.isAdding}
          user={user}
          onSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let user
  if (ownProps.params.id === undefined) {
    user = {
      username: '',
      password: '',
      type: USER_TYPE_USER,
    }
  } else {
    user = state.users.find(_user => _user._id === ownProps.params.id)
    user.password = ''
  }

  return {
    user,
  }
}

const mapDispatchToProps = {
  addUserRequest,
  updateUserRequest,
  getUserRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditContainer)
