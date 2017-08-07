import passport from 'passport'

import User from 'Server/models/User'

const postLogin = (req, res, next) => {
  req.assert('username', 'Username cannot be blank.').notEmpty()
  req.assert('password', 'Password cannot be blank.').notEmpty()

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      // Return an array of validation error messages.
      const message = result.useFirstErrorOnly().array().map(error => error.msg)
      return res.status(400).json({ message })
    }

    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err)
      }

      if (!user) {
        return res.status(401).json(info)
      }

      req.logIn(user, (err) => { // eslint-disable-line no-shadow
        if (err) {
          return next(err)
        }

        return res.status(200).json({
          username: user.username,
          isAdmin: user.isAdmin(),
        })
      })
    })(req, res, next)
  })
}

const getLogout = (req, res) => {
  req.logout()
  return res.status(200).end()
}

const postChangePassword = (req, res, next) => {
  req.assert('password', 'Password cannot be blank.').notEmpty()

  req.getValidationResult().then((result) => {
    if (!result.isEmpty()) {
      // Return an array of validation error messages.
      const message = result.useFirstErrorOnly().array().map(error => error.msg)
      return res.status(400).json({ message })
    }

    User.findById(req.user._id, (err, user) => {
      if (err) {
        return next(err)
      }

      if (!user) {
        return res.status(400).end()
      }

      user.password = req.body.password // eslint-disable-line no-param-reassign
      user.save((err) => { // eslint-disable-line no-shadow
        if (err) {
          return next(err)
        }

        return res.status(200).end()
      })
    })
  })
}

export default {
  postLogin,
  getLogout,
  postChangePassword,
}
