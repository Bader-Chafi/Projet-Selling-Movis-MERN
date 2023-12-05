const express = require('express');
const router = express.Router();
const { addToCart, getCartsUser } = require('../controllers/cartItemController');

router.route('/')
    .post(addToCart)
router.route('/:userId')
    .get(getCartsUser)

module.exports = router