const express = require('express')
const router = express.Router()

const user = require('../controllers/userController')

//userRoutes

//login
router.post('/login', user.login)

//signup
router.post('/signup', user.signup)

module.exports = router