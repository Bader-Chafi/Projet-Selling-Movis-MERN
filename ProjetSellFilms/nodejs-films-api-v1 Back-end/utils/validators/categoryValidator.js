const { check } = require("express-validator");
const {validatorMiddleware} = require("../../middlewares/validatorMiddleware");


exports.getCategoryValidator = [
    // Add rules
    check('id').isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware,
]

exports.createCategoryValidator = [
    check('name')
    .notEmpty().withMessage("Invalid category id format")
    .isLength({min:3}).withMessage("tou short category name")
    .isLength({max:33}).withMessage("tou long category name"),
    validatorMiddleware
]

exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware
]

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage("Invalid category id format"),
    validatorMiddleware
]