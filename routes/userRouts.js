const express = require('express')
const router = express.Router()

// authMiddleweare
const authMiddleware = require("../middleweare/authMiddleware")

// user controllers
const {register, login, checkUser}= require
('../controller/userController')

// register rout
router.post('/register', register)

// login user
router.post('/login', login)

// check user
router.get('/check', authMiddleware, checkUser)
module.exports = router