const express = require('express')
const userRouter = express.Router()
const userController = require('./../../controllers/userController')

userRouter.post('/user/signup', userController.signup)
userRouter.post('/user/login', userController.login)
userRouter.get('/user/signout', userController.handelSignout)
userRouter.post('/user/googlesignin' , userController.handelGoogleSignin)

module.exports = userRouter
