const { check } = require("express-validator");
const {validatorMiddleware} = require("../../middlewares/validatorMiddleware");


exports.getDateValidator = [
    // Add rules
    check('id').isMongoId().withMessage("Invalid Date id format"),
    validatorMiddleware,
]

exports.createDateValidator = [
    check('name')
    .notEmpty().withMessage("Invalid Date id format")
    .isLength({min:3}).withMessage("tou short Date name")
    .isLength({max:33}).withMessage("tou long Date name"),
    validatorMiddleware
]

exports.updateDateValidator = [
    check('id').isMongoId().withMessage("Invalid Date id format"),
    validatorMiddleware
]

exports.deleteDateValidator = [
    check('id').isMongoId().withMessage("Invalid Date id format"),
    validatorMiddleware
]