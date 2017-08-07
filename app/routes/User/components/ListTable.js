import React, { PropTypes } from 'react'
import ListItem from '../components/ListItem'

const ListTable = ({ users, onDelete }) => (
  <table className="table table-striped">
    <thead>
      <tr>
        <th>No.</th>
        <th>Username</th>
        <th>Type</th>
        <th>Created At</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {
        users.length
        ? (
          users.map((user, index) => (
            <ListItem key={user._id} index={index + 1} {...user} onDelete={onDelete} />
          ))
        )
        : (
          <tr>
            <td colSpan="5" className="text-muted text-center">There is no user.</td>
          </tr>
        )
      }
    </tbody>
  </table>
)

ListTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ListTable
