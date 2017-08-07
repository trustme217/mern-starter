import request from 'supertest'
import passport, { Strategy } from 'passport'
import util from 'util'

import createServer from 'Server/server'
import User from 'Server/models/User'

describe('AuthController', () => {
  describe('POST /api/login', () => {
    let serverInstance

    before(() => {
      const server = createServer()
      serverInstance = request(server)

      function MockStrategy(verify) {
        this.name = 'local'
        this._verify = verify
      }

      util.inherits(MockStrategy, Strategy)

      MockStrategy.prototype.authenticate = function authenticate(req) {
        const verfied = (err, user, info) => {
          if (err) {
            return this.error(err)
          }
          if (!user) {
            return this.fail(info)
          }
          return this.success(user, info)
        }

        this._verify(req.body.username, req.body.password, verfied)
      }

      passport.use(new MockStrategy((username, password, done) => {
        if (username === 'admin' && password === 'password') {
          return done(null, {
            id: 'some-user-id',
            isAdmin: () => false,
          })
        }
        return done(null, false, { message: 'Invalid username or password.' })
      }))
    })

    it('should return 400 Bad Request when parameters are missing', (done) => {
      serverInstance
        .post('/api/login')
        .expect(400, done)
    })

    it('should return 401 Unauthorized when credentials are incorrect', (done) => {
      serverInstance
        .post('/api/login')
        .send({
          username: 'admin',
          password: 'incorrect-password',
        })
        .expect(401, done)
    })

    it('should return 200 OK when credentials are correct', (done) => {
      serverInstance
        .post('/api/login')
        .send({
          username: 'admin',
          password: 'password',
        })
        .expect(200, done)
    })
  })

  describe('GET /api/logout', () => {
    it('should return 200 OK', (done) => {
      request(createServer())
        .get('/api/logout')
        .expect(200, done)
    })
  })

  describe('GET /api/profile/password', () => {
    it('should return 401 Unauthorized when an user has not logged in', (done) => {
      request(createServer())
        .post('/api/profile/password')
        .expect(401, done)
    })

    it('should return 400 Bad Request when parameters are missing', (done) => {
      const server = createServer([(req, res, next) => {
        req.user = { // eslint-disable-line no-param-reassign
          id: 'some-user-id',
        }
        next()
      }])

      request(server)
        .post('/api/profile/password')
        .expect(400, done)
    })

    it('should return 200 OK after successful update', (done) => {
      const server = createServer([(req, res, next) => {
        req.user = { // eslint-disable-line no-param-reassign
          id: 'some-user-id',
        }
        next()
      }])

      User.findById = (id, cb) => {
        cb(null, {
          save: (callback) => {
            callback(null)
          },
        })
      }

      request(server)
        .post('/api/profile/password')
        .send({
          password: 'new-password',
        })
        .expect(200, done)
    })
  })
})
