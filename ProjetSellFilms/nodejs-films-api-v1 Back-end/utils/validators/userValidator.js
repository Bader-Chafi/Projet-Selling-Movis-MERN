const { check } = require("express-validator");
const { validatorMiddleware } = require("../../middlewares/validatorMiddleware");
const Film = require("../../models/filmModel");
const User = require("../../models/userModel");


exports.createUserValidator = [
    check('userName')
        .notEmpty().withMessage('the name is required')
        .isLength({ min: 4 }).withMessage("tou short name")
        .isLength({ max: 20 }).withMessage("tou long name"),
    check('email')
        .notEmpty().withMessage('the email is required')
        .isEmail().withMessage("Please enter a valid email")
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new Error('Email is already in use');
            }
            return true;
        }),
    check('password')
        .notEmpty().withMessage("password is required"),
    check('film')
        .optional()
        .isArray()
        .isMongoId().withMessage("Invalid film id ")
        .custom((filmIds) => {
            return Film.find({ _id: { $in: filmIds } })
                .then((films) => {
                    if (films.length !== filmIds.length) {
                        return Promise.reject(`One or more film IDs are invalid`);
                    }
                });
        }),
    validatorMiddleware
]

exports.loginUserValidator = [
    check('email').notEmpty().withMessage('Your E-mail address Is Required').isEmail(),
    check('password').notEmpty().withMessage('Your Password Is Required'),
]

exports.getUserValidator = [
    // Add rules
    check('id').isMongoId().withMessage("Invalid User id format"),
    validatorMiddleware,
]

exports.updateUserValidator = [
    check('id').isMongoId().withMessage("Invalid User id format"),
    check('film')
        .optional()
        .isArray()
        .isMongoId().withMessage("Invalid film id ")
        .custom((filmIds) => {
            return Film.find({ _id: { $in: filmIds } })
                .then((films) => {
                    if (films.length !== filmIds.length) {
                        return Promise.reject(`One or more film IDs are invalid`);
                    }
                });
        }),
    validatorMiddleware
]

exports.deleteUserValidator = [
    check('id').isMongoId().withMessage("Invalid User id format"),
    validatorMiddleware
]