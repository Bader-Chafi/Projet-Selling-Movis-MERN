// CartItemController.js
const CartItem = require('../models/cartItemModel')
const asyncHandler = require('express-async-handler')

exports.addToCart = asyncHandler(async (req, res) => {
  const { filmId, userId } = req.body;
  let cartItem = await CartItem.findOne({ user: userId, film: filmId });

  if (!cartItem) {
    cartItem = CartItem.create({ user: userId, film: filmId });
    res.status(200).json({ msg: 'Film added to cart', data: cartItem });
  } else {
    res.status(201).send({ msg: 'you already have it in the cart' })
  }
})

exports.getCartsUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  try {
    const cartUser = await CartItem.find({ user: userId }).populate({ path: 'film' });
    if (cartUser) {
      res.status(200).send({ length: cartUser.length, data: cartUser });
    } else {
      res.status(200).send({ msg: 'You have not Any film of this user:"' });
    }
  } catch (err) {
    console.log(err)
  }
})

exports.deleteCartUser = asyncHandler(async (req, res) => {
  const { userId, filmId } = req.query;
  const cartUser = await CartItem.findOneAndDelete({ user: userId, film: filmId });
  if (cartUser) {
    res.status(200).send({ msg: 'You Are Remove the item' });
  } else {
    res.status(500).send({ msg: 'there is not found this item' })
  }
});

exports.deleteAllCartUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const allCart = await CartItem.deleteMany({ user: userId });
  if (allCart) {
    res.status(200).send({ msg: 'You Are Remove ALL items' });
  } else {
    res.status(500).send({ msg: 'There is no cart found for this user' });
  }
});
