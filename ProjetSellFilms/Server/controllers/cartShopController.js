const asyncHandler = require('express-async-handler')
const cartShopModel = require("../models/cartShopModel");
const cartCreditModel = require('../models/cartCreditModel');


exports.addPaymentCredit = asyncHandler(async (req, res) => {
    const {user, film} = req.body;
    const addPay = await cartShopModel.findOne({ user, film});
    if (!addPay) {
        const payment = await cartShopModel.create({
            user: req.body.user,
            film: req.body.film,
            fullName: req.body.fullName,
            cartNumber: req.body.cartNumber.replace(/\s/g, ''),
            cvc: req.body.cvc,
            date: req.body.date,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            price: req.body.price,
            country: req.body.country,
        });
        if (!payment) {
            res.status(404).send({ msg: 'Payment Unsuccessful', data: payment })
        }
        res.status(200).send({ msg: 'Payment Successful', data: payment });
    } else {
        res.status(200).send({ msg: 'You Have alredy this Payment Film', data: addPay });
    }
})

exports.getAllPayment = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const getPayment = await cartShopModel.find({ user: userId });
    if (!getPayment) {
        res.status(201).send({ msg: 'You dant have any Payment' });
    }
    res.status(200).send({ length: getPayment.length, data: getPayment });
}); 

exports.updateStatusPayment = asyncHandler(async (req, res) => {
    const { peymentId } = req.params;
    const getPayment = await cartShopModel.find({ user: userId });
    if (!getPayment) {
        res.status(201).send({ msg: 'You dant have any Payment' });
    }
    res.status(200).send({ length: getPayment.length, data: getPayment });
}); 

exports.addCreditCard = asyncHandler(async (req, res) => {
    const {user} = req.body;
    const findCart = await cartCreditModel.findOne({user});
    if (findCart.length > 0) {
        return res.status(500).send({ msg:'You Have alredy this card', data:findCart });
    }else {
        const addCreditCard = await cartCreditModel.create(req.body)
        return res.status(201).send({ msg: 'Add Cart Credit Successfuly', data:addCreditCard });
    }

});