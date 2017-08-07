import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Link from 'react-router/lib/Link'
import { loadUsersRequest, deleteUserRequest } from 'App/actions/users'
import ListTable from '../components/ListTable'

class ListContainer extends Component {
  static propTypes = {
    loadUsersRequest: PropTypes.func.isRequired,
    deleteUserRequest: PropTypes.func.isRequired,
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
  }

  constructor(props) {
    super(props)

    this.onDelete = this.onDelete.bind(this)
  }

  componentDidMount() {
    this.props.loadUsersRequest()
  }

  onDelete(id) {
    this.props.deleteUserRequest(id)
  }

  render() {
    const { users } = this.props

    return (
      <div>
        <h2>Users</h2>
        <div className="clearfix">
          <Link to="users/add" className="btn btn-primary btn-sm pull-right">Add New User</Link>
        </div>
        <ListTable users={users} onDelete={this.onDelete} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
})

const mapDispatchToProps = {
  loadUsersRequest,
  deleteUserRequest,
}

export default connect(mapStateToProps, mapDispatchToProps)(ListContainer)
