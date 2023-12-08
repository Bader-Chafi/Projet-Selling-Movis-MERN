const mongoose = require('mongoose');

const cartCreditSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            require: true,
        },
        fullName: {
            type: String,
            require: true,
        },
        cartNumber: {
            type: String,
            require: true,
            maxlength: 16,
        },
        cvc: {
            type: String,
            require: true,
            maxlength: 3,
        },
        date: {
            type: String,
            require: true,
        },
        phonNumber: {
            type: String,
            require: true,
        },
        country: {
            type: String,
            require: true,
        },
    }, { joined: true }
);

module.exports = mongoose.model('CartCredit', cartCreditSchema)