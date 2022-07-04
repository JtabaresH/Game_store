const express = require('express')

// Controllers
const { createUser, loginUser, getAllActiveUsers, updateUser, disableUser } = require('../controllers/users.controller')
const { userExists } = require('../middlewares/users.middleware')
const { createUserValidators } = require('../middlewares/validators.middleware')

const usersRouter = express.Router()

usersRouter.post('/singup', createUserValidators, createUser)
usersRouter.post('/login', loginUser)
usersRouter.get('/', getAllActiveUsers)
usersRouter.patch('/:id', userExists, updateUser)
usersRouter.delete('/:id', userExists, disableUser)

module.exports = { usersRouter }