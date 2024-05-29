const express = require('express');
const cartRouter = express.Router();

cartRouter.post('/getCart',(req, res) => {
    console.log(req.email)
    return res.json({ msg : 'cart'})
})

module.exports = {
    cartRouter
}