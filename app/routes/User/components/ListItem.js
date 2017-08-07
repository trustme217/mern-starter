import React, { PropTypes } from 'react'
import Link from 'react-router/lib/Link'
import { filterUserType, filterDate } from 'App/utils'

const ListItem = ({ _id, index, username, type, createdAt, onDelete }) => (
  <tr>
    <td>{index}</td>
    <td>{username}</td>
    <td>{filterUserType(type)}</td>
    <td>{filterDate(createdAt)}</td>
    <td className="text-right">
      <Link to={`/users/${_id}`} className="btn btn-info btn-xs">Edit</Link>
      <button type="button" className="btn btn-danger btn-xs" onClick={() => { onDelete(_id) }}>
        Delete
      </button>
    </td>
  </tr>
)

ListItem.propTypes = {
  _id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
}

export default ListItem
