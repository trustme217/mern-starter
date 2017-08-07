import { USER_TYPE_ADMIN, USER_TYPE_USER } from 'Server/constants'

/**
 * Format ISO Date as YYYY-MM-DD.
 * @param  {string} date The date string in ISO Date format.
 * @return {string} The date string in YYYY-MM_DD format.
 */
export const filterDate = (date) => {
  const d = new Date(date)
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}

/**
 * Return friendly string for user type.
 * @param  {string} type One of user type constants.
 * @return {string} The friendly representation.
 */
export const filterUserType = (type) => {
  switch (type) {
    case USER_TYPE_ADMIN:
      return 'Administrator'
    case USER_TYPE_USER:
      return 'User'
    default:
      return ''
  }
}

export const getAllUserTypes = () => (
  [USER_TYPE_ADMIN, USER_TYPE_USER].map(type => ({
    name: filterUserType(type),
    value: type,
  }))
)
