// CartItemController.js
const CartItem = require('../models/cartItemModel')
const asyncHandler = require('express-async-handler')


exports.addToCart = asyncHandler(async (req, res) => {
  const { filmId, userId } = req.body;
  let cartItem = await CartItem.findOne({ user: userId, film: filmId });

  if (!cartItem) {
    cartItem = CartItem.create({ user: userId, film: filmId });
    res.status(200).json({ message: 'Film added to cart', data: cartItem });
  } else {
    res.status(201).send({ msg: 'you already have it in the cart' })
  }
})

exports.getCartsUser = asyncHandler(async (req, res) => {
  const { userId } = req.query.userId;
  const cartUser = await CartItem.find({ userId: userId }).populate({ path: 'film', select: 'title' });
  if (cartUser) {
    res.status(200).send({ length: cartUser.length, data: cartUser });
  } else {
    res.status(201).send({ msg: 'You have not Any film in the cart' });
  }
})
