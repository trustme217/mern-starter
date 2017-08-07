import request from 'supertest'
import expect from 'expect'

import createServer from 'Server/server'
import User from 'Server/models/User'
import { USER_TYPE_USER } from 'Server/constants'

describe('UserController', () => {
  describe('GET /api/users', () => {
    it('should return 401 Unauthorized when an user has not logged in', (done) => {
      request(createServer())
        .get('/api/users')
        .expect(401, done)
    })

    it('should return 401 Unauthorized when an user is not of admin type', (done) => {
      const server = createServer([(req, res, next) => {
        req.user = { // eslint-disable-line no-param-reassign
          id: 'some-user-id',
          isAdmin: () => false,
        }
        next()
      }])
      request(server)
        .get('/api/users')
        .expect(401, done)
    })

    it('should return 200 OK', (done) => {
      const server = createServer([(req, res, next) => {
        req.user = { // eslint-disable-line no-param-reassign
          id: 'some-user-id',
          isAdmin: () => true,
        }
        next()
      }])
      request(server)
        .get('/api/users')
        .expect(200, done)
    })
  })

  describe('POST /api/users', () => {
    let serverInstance
    before(() => {
      const server = createServer([(req, res, next) => {
        req.user = { // eslint-disable-line no-param-reassign
          id: 'some-user-id',
          isAdmin: () => true,
        }
        next()
      }])

      serverInstance = request(server)
    })

    it('should return 400 Bad Request when parameters are missing', (done) => {
      serverInstance
        .post('/api/users')
        .expect(400, done)
    })

    it('should return 400 Bad Request when an user type is invalid', (done) => {
      serverInstance
        .post('/api/users')
        .send({
          username: 'username',
          password: 'password',
          type: 'invalid-user-type',
        })
        .expect(400, done)
    })

    it('should return 400 Bad Request when an username already exists', (done) => {
      User.findOne = (query, cb) => {
        cb(null, true)
      }

      serverInstance
        .post('/api/users')
        .send({
          username: 'username',
          password: 'password',
          type: USER_TYPE_USER,
        })
        .expect(400, done)
    })

    it('should return 200 OK after adding a new user', (done) => {
      User.findOne = (query, cb) => {
        cb(null, false)
      }

      User.prototype.save = (cb) => {
        cb(null)
      }

      serverInstance
        .post('/api/users')
        .send({
          username: 'username',
          password: 'password',
          type: USER_TYPE_USER,
        })
        .expect(200, done)
    })
  })

  describe('GET /api/users/:id', () => {
    let serverInstance
    before(() => {
      const server = createServer([(req, res, next) => {
        req.user = { // eslint-disable-line no-param-reassign
          id: 'some-user-id',
          isAdmin: () => true,
        }
        next()
      }])

      serverInstance = request(server)
    })

    it('should return 400 Bad Request when there is no user with ID', (done) => {
      User.findById = (id, cb) => {
        cb(null, false)
      }

      serverInstance
        .get('/api/users/some-user-id')
        .expect(400, done)
    })

    it('should return 200 OK with user details', (done) => {
      const user = {
        _id: 'some-user-id',
        username: 'username',
        type: USER_TYPE_USER,
        createdAt: 'some-date-time',
      }

      User.findById = (id, cb) => {
        cb(null, user)
      }

      serverInstance
        .get('/api/users/some-user-id')
        .expect(200)
        .end((err, response) => {
          if (err) {
            return done(err)
          }
          expect(response.body).toEqual(user)
          return done()
        })
    })
  })

  describe('PUT /api/users/:id', () => {
    let serverInstance
    before(() => {
      const server = createServer([(req, res, next) => {
        req.user = { // eslint-disable-line no-param-reassign
          id: 'some-user-id',
          isAdmin: () => true,
        }
        next()
      }])

      serverInstance = request(server)
    })

    it('should return 400 Bad Request when parameters are missing', (done) => {
      serverInstance
        .put('/api/users/some-user-id')
        .expect(400, done)
    })

    it('should return 400 Bad Request when an user type is invalid', (done) => {
      serverInstance
        .put('/api/users/some-user-id')
        .send({
          password: 'password',
          type: 'invalid-user-type',
        })
        .expect(400, done)
    })

    it('should return 200 OK with updated user details', (done) => {
      const user = {
        _id: 'some-user-id',
        username: 'username',
        type: USER_TYPE_USER,
        createdAt: 'some-date-time',
      }

      User.findOneAndUpdate = (query, payload, options, cb) => {
        cb(null, user)
      }

      serverInstance
        .put('/api/users/some-user-id')
        .send({
          username: 'username',
          password: 'password',
          type: USER_TYPE_USER,
        })
        .expect(200)
        .end((err, response) => {
          if (err) {
            return done(err)
          }
          expect(response.body).toEqual(user)
          return done()
        })
    })
  })

  describe('DELETE /api/users/:id', () => {
    let serverInstance
    before(() => {
      const server = createServer([(req, res, next) => {
        req.user = { // eslint-disable-line no-param-reassign
          id: 'some-user-id',
          isAdmin: () => true,
        }
        next()
      }])

      serverInstance = request(server)
    })

    it('should return 200 OK after deleting user', (done) => {
      serverInstance
        .delete('/api/users/some-user-id')
        .expect(200, done)
    })
  })
})
