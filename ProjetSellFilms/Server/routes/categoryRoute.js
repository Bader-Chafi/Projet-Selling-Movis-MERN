const express = require("express");
const {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator
} = require('../utils/validators/categoryValidator');
const {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/categoryController");

const filmRoute = require('./filmRoute')
const router = express.Router();

router.use('/:categoryId/films', filmRoute)

router
    .route("/")
    .get(getCategories)
    .post(createCategoryValidator, createCategory);

router
    .route("/:id")
    .get(getCategoryValidator, getCategory)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;
