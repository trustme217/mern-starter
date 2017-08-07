import bcrypt from 'bcrypt-nodejs'
import mongoose from 'mongoose'
import { USER_TYPE_ADMIN, USER_TYPE_USER, USER_TYPES } from 'Server/constants'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  type: {
    type: String,
    enum: USER_TYPES,
    default: USER_TYPE_USER,
  },
}, {
  timestamps: true,
})

/**
 * Password hash middleware.
 */
userSchema.pre('save', function save(next) {
  const user = this
  if (!user.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err)
    }

    bcrypt.hash(user.password, salt, null, (err, hash) => { // eslint-disable-line
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})

/**
 * Helper method for validating user's password
 */
userSchema.methods.checkPassword = function checkPassword(plain, cb) {
  bcrypt.compare(plain, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}

/**
 * Helper method to determine if the user is of admin type.
 */
userSchema.methods.isAdmin = function isAdmin() {
  return this.type === USER_TYPE_ADMIN
}

const User = mongoose.model('User', userSchema)

export default User
