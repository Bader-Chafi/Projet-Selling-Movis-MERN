const mongoose = require('mongoose');

const cartShopSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: [true,"you must add user"],
        },
        film: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Film',
            require: [true,"you must add film"],
        },
        price: {
            type: String,
            require: [true,"you must add price"],
        },
        fullName: {
            type: String,
            require: [true,"you must add fullName"],
        },
        cartNumber: {
            type: String,
            require: [true,"you must add cartNumber"],
            maxlength: 16,
        },
        cvc: {
            type: String,
            require: [true,"you must add cvc"],
            maxlength: 3,
        },
        date: {
            type: String,
            require: [true,"you must add date"],
        },
        phoneNumber: {
            type: String,
            require: [true,"you must add phoneNumber"],
        },
        email: {
            type: String,
            require: [true,"you must add email"],
        },
        country: {
            type: String,
            require: [true,"you must add country"],
        },
        status: {
            type: String,
            require: [true,""],
            default: 'Proccess'
        },
    }, { joined: true }
);

module.exports = mongoose.model('CartShop', cartShopSchema)