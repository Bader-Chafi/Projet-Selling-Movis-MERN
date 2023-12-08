const express = require('express');
const router = express.Router();
const {addPaymentCredit,getAllPayment} = require('../controllers/cartShopController')

router.route('/')
.post(addPaymentCredit)

router.route('/:userId')
.get(getAllPayment)



module.exports = router;