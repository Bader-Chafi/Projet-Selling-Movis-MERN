const { check } = require("express-validator");
const { validatorMiddleware } = require("../../middlewares/validatorMiddleware");
const Category = require("../../models/categoryModel");
const Date = require("../../models/dateModel");
const Section = require("../../models/sectionModel");

exports.getFilmValidator = [
    // Add rules
    check('id').isMongoId().withMessage("Invalid film id format"),
    validatorMiddleware,
]

exports.createfilmValidator = [
    check('title')
        .notEmpty().withMessage("film required")
        .isLength({ min: 2 }).withMessage("too short film title"),
    check('description')
        .notEmpty().withMessage("film description required")
        .isLength({ max: 2000 }).withMessage("too long film title"),
    check('sold')
        .optional()
        .isNumeric()
        .withMessage("film sold must be a number"),
    check('price')
        .notEmpty().withMessage("film Price is required")
        .isNumeric().withMessage("film sold must be a number")
        .isLength({ max: 32 }).withMessage('to long price'),
    check('priceAfterDiscount')
        .optional().isNumeric().withMessage("film price after discount must be a number")
        .toFloat()
        .custom((value, { req }) => {
            if (req.body.price <= value) {
                throw new Error("film priceAfterDiscount must be lower than film price")
            }
            return value;
        }),
    check('imageCover')
        .notEmpty().withMessage("film image cover is required"),
    check('images')
        .optional().isArray().withMessage("film images should be an array of images"),
    check('category')
        .notEmpty().withMessage("film must be belongs to category")
        .isMongoId().withMessage("Invalid category id ").custom((CategoryId) => Category.findById(CategoryId)
            .then((Category) => {
                if (!Category) {
                    return Promise.reject(
                        new Error(`Invalid category id ${CategoryId}`)
                    );
                }
            })),
    check('date')
        .notEmpty().withMessage("film must be belongs to date")
        .isMongoId().withMessage("Invalid date id ").custom((DateId) => Date.findById(DateId)
            .then((Date) => {
                if (!Date) {
                    return Promise.reject(
                        new Error(`Invalid Date id ${DateId}`)
                    );
                }
            })),
    check('section')
        .notEmpty().withMessage("film must be belongs to section")
        .isMongoId().withMessage("Invalid date id ").custom((SectionId) => Section.findById(SectionId)
            .then((Section) => {
                if (!Section) {
                    return Promise.reject(
                        new Error(`Invalid Date id ${DateId}`)
                    );
                }
            })),
    check('ratingsAverage')
        .optional()
        .isNumeric().withMessage("ratingsAverage must be a number")
        .isLength({ min: 1 }).withMessage("Rating must be above or equal 1.0")
        .isLength({ max: 6 }).withMessage("Rating must be above or equal 5.0"),
    check('ratingsQuantity')
        .optional()
        .isNumeric().withMessage("Rating Qountity must be a number'="),
    validatorMiddleware
]

exports.updatefilmValidator = [
    check('id').isMongoId().withMessage("Invalid film id format"),
    validatorMiddleware
]

exports.deletefilmValidator = [
    check('id').isMongoId().withMessage("Invalid film id format"),
    validatorMiddleware
]