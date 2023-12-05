const express = require('express');
const router = express.Router();
const {
    addToCart,
    getCartsUser,
    deleteCartUser,
    deleteAllCartUser
} = require('../controllers/cartItemController');

router.post('/',addToCart)
// Get all carts for a specific user
router.get('/:userId', getCartsUser);

// Delete all carts for a specific user
router.put('/:userId', deleteAllCartUser);

// Delete a specific cart for a user
router.put('/', deleteCartUser);


module.exports = router