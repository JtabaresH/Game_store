const express = require('express')

// Controllers
const { createUser, loginUser, getAllActiveUsers, updateUser, disableUser } = require('../controllers/users.controller')
const { protectSession, protectUserAccount } = require('../middlewares/auth.middleware')
const { userExists } = require('../middlewares/users.middleware')
const { createUserValidators } = require('../middlewares/validators.middleware')

const usersRouter = express.Router()

usersRouter.post('/singup', createUserValidators, createUser)
usersRouter.post('/login', loginUser)
usersRouter.use(protectSession)
usersRouter.get('/', getAllActiveUsers)
usersRouter
    .use('/:id', userExists)
    .route('/:id')
    .patch(protectUserAccount, updateUser)
    .delete(protectUserAccount, disableUser)

module.exports = { usersRouter }