const express = require('express');
const {
    loginUserValidator,
} = require("../utils/validators/userValidator");
const {
    loginUser
} = require("../controllers/userController");

const router = express.Router();
router
    .route('/')
    .post(loginUserValidator, loginUser);

module.exports = router;