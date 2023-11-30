const { check } = require("express-validator");
const {validatorMiddleware} = require("../../middlewares/validatorMiddleware");


exports.getSectionValidator = [
    // Add rules
    check('id').isMongoId().withMessage("Invalid Section id format"),
    validatorMiddleware,
]

exports.createSectionValidator = [
    check('name')
    .notEmpty().withMessage("Invalid Section id format")
    .isLength({min:3}).withMessage("tou short Section name")
    .isLength({max:33}).withMessage("tou long Section name"),
    validatorMiddleware
]

exports.updateSectionValidator = [
    check('id').isMongoId().withMessage("Invalid Section id format"),
    validatorMiddleware
]

exports.deleteSectionValidator = [
    check('id').isMongoId().withMessage("Invalid Section id format"),
    validatorMiddleware
]