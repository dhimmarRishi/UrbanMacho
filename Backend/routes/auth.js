const express = require('express');
const {handleLogin, handleRegister} = require('../handlers/auth')

const authRouter = express.Router();

authRouter.post('/login' , handleLogin)
authRouter.post('/register' , handleRegister)

module.exports = {
    authRouter
}