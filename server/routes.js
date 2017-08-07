import express from 'express'

import { isAuthenticated, isAdmin } from './middleware/passport'

import AuthController from './controllers/auth'
import UserController from './controllers/user'

const router = new express.Router()

router.post('/login', AuthController.postLogin)
router.get('/logout', AuthController.getLogout)
router.post('/profile/password', isAuthenticated, AuthController.postChangePassword)

router.get('/users', isAuthenticated, isAdmin, UserController.getUsers)
router.post('/users', isAuthenticated, isAdmin, UserController.postUser)
router.get('/users/:id', isAuthenticated, isAdmin, UserController.getUser)
router.put('/users/:id', isAuthenticated, isAdmin, UserController.putUser)
router.delete('/users/:id', isAuthenticated, isAdmin, UserController.deleteUser)

export default router
