import passport from 'passport'
import LocalStrategy from 'passport-local'

import User from 'Server/models/User'

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return done(err)
    }

    if (!user) {
      return done(null, false, { message: 'Invalid username or password.' })
    }

    user.checkPassword(password, (err, isMatch) => { // eslint-disable-line no-shadow
      if (err) {
        return done(err)
      }

      if (isMatch) {
        return done(null, user)
      }

      return done(null, false, { message: 'Invalid username or password.' })
    })
  })
}))

export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  return res.status(401).end()
}

export const isAdmin = (req, res, next) => {
  if (req.user.isAdmin()) {
    return next()
  }
  return res.status(401).end()
}
