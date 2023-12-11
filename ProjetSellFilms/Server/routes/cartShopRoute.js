const express = require('express');
const router = express.Router();
const { addPaymentCredit, getAllPaymentUser, getAllPayment, updateStatusPayment } = require('../controllers/cartShopController')

router.route('/')
    .post(addPaymentCredit)
    .get(getAllPayment);

router.route('/:id')
    .get(getAllPaymentUser)
    .put(updateStatusPayment)




module.exports = router;