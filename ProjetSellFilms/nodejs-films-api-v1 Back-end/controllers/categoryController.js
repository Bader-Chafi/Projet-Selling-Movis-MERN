const slugify = require("slugify");
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');

const Category = require('../models/categoryModel');

// get list of categories
// rout get /api/v1/categories
exports.getCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;
    const categories = await Category.find({}).skip(skip).limit(limit);
    res.status(200).json({ result: categories.length, page, data: categories });
    res.status(200).json({data: categories });
});
// @DESC  GET SPICIFIQUE category
// Route get /api/v1/categories:id
// @access public
exports.getCategory = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const category = await Category.findById(id);
    if (!category) {
        return next(new ApiError(`Category not found for this id ${id}`, 404))
    };
    res.status(200).json({ data: category });
})

// @DESC  CREATE category
// Route POST /api/v1/categories
// @access Privat
exports.createCategory = asyncHandler(async (req, res) => {
    const category = await Category.create(req.body);
    res.status(201).json({ data: category })
});

// @DESC  Update category
// Route PUT /api/v1/categories/:id
// @access Privat
exports.updateCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findOneAndUpdate(
        { _id: id }, 
        req.body, 
        { new: true });
    if (!category) {
        return next(new ApiError(`Category not Update ${id}`, 404));
    }
    res.status(200).json({ data: category });
})

// @DESC  dELETE category
// Route DELETE /api/v1/categories/:id
// @access Privat
exports.deleteCategory = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
        return next(new ApiError(`Category id not found for delete this: ${id}`, 404));
    }
    res.status(200).send('Category deleted');
})