import User from 'Server/models/User'
import { USER_TYPES } from 'Server/constants'

const getUsers = (req, res, next) => {
  User
    .find({
      _id: {
        $ne: req.user._id,
      },
    })
    .select('_id username type createdAt')
    .exec((err, users) => {
      if (err) {
        return next(err)
      }

      return res.status(200).json(users)
    })
}

const postUser = (req, res, next) => {
  req.assert('username', 'Username cannot be blank.').notEmpty()
  req.assert('password', 'Password cannot be blank.').notEmpty()
  req.assert('type', 'Type is invalid.').isIn(USER_TYPES)

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      // Return an array of validation error messages.
      const message = result.useFirstErrorOnly().array().map(error => error.msg)
      return res.status(400).json({ message })
    }

    User.findOne({ username: req.body.username }, (err, existingUser) => {
      if (err) {
        return next(err)
      }

      if (existingUser) {
        return res.status(400).json({
          message: 'Username already exists.',
        })
      }

      const user = new User({
        username: req.body.username,
        password: req.body.password,
        type: req.body.type,
      })
      user.save((err) => { // eslint-disable-line no-shadow
        if (err) {
          return next(err)
        }

        return res.status(200).json({
          _id: user._id,
          username: user.username,
          type: user.type,
          createdAt: user.createdAt,
        })
      })
    })
  })
}

const getUser = (req, res, next) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return next(err)
    }

    if (!user) {
      return res.status(400).end()
    }

    return res.status(200).json({
      _id: user._id,
      username: user.username,
      type: user.type,
      createdAt: user.createdAt,
    })
  })
}

const putUser = (req, res, next) => {
  req.assert('password', 'Password cannot be blank.').notEmpty()
  req.assert('type', 'Type is invalid.').isIn(USER_TYPES)

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      // Return an array of validation error messages.
      const message = result.useFirstErrorOnly().array().map(error => error.msg)
      return res.status(400).json({ message })
    }

    const query = { _id: req.params.id }
    const payload = {
      password: req.body.password,
      type: req.body.type,
    }
    const options = {
      new: true, // Return the modified document.
    }

    User.findOneAndUpdate(query, payload, options, (err, user) => {
      if (err) {
        return next(err)
      }

      return res.status(200).json({
        _id: user._id,
        username: user.username,
        type: user.type,
        createdAt: user.createdAt,
      })
    })
  })
}

const deleteUser = (req, res, next) => {
  User.remove({ _id: req.params.id }, (err) => {
    if (err) {
      return next(err)
    }

    return res.status(200).end()
  })
}

export default {
  getUsers,
  postUser,
  getUser,
  putUser,
  deleteUser,
}
