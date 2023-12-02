const express = require('express');
const { getAdmin, getAllAdmins } = require('../controllers/adminController');

const router = express.Router();

router
    .route('/:id')
    .get(getAdmin)

router
    .route('/')
    .get(getAllAdmins)

module.exports = router