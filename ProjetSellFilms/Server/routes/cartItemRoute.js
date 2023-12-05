const express = require('express');
const router = express.Router();
const { addToCart, getCartsUser } = require('../controllers/cartItemController');

router
    .post('/', addToCart)
    .get('/',getCartsUser)

module.exports = router