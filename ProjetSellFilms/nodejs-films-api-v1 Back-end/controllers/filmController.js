const slugify = require("slugify");
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');

const filmModel = require("../models/filmModel");

// @DESC  CREATE Films
// Route POST /api/v1/subcategories
// @access Privat
exports.createFilm = asyncHandler(async (req, res) => {
    console.log(req.body)
    req.body.slug = slugify(req.body.title);
    const film = await filmModel.create(req.body);
    res.status(201).json({ data: film })
});

// nested route
// Get /api/v1/categories/:cotegoryId/films 
// Get /api/v1/dates/:dateId/films 

// get list of Sub Categories
// rout get /api/v1/subcategories
exports.getFilms = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;

    let filterObject = {}; // Initialize an empty filter object
    if (req.params.categoryId) {
        filterObject.category = req.params.categoryId;
    }
    if (req.params.dateId) {
        filterObject.date = req.params.dateId;
    }
    if (req.params.sectionId) {
        filterObject.section = req.params.sectionId;
    }
    console.log(req.params);
    const films = await filmModel.find(filterObject).skip(skip).limit(limit).populate([
        { path: 'category', select: 'name-_id' },
        { path: 'date', select: 'name-_id' },
        { path: 'section', select: 'name-_id' }]);
    res.status(200).json({ result: films.length, page, data: films });
});

// @DESC  GET SPICIFIQUE Films
// Route get /api/v1/SubCategories:id
// @access public
exports.getFilm = asyncHandler(async (req, res, next) => {
    // req.body.slug = slugify(req.body.title);
    const id = req.params.id;
    const Film = await filmModel.findById({ _id: id }).populate(
        [{ path: 'category', select: 'name -_id' },
        { path: 'date', select: 'name -_id' },
        { path: 'section', select: 'name -_id' },
        ]
    );
    if (!Film) {
        return next(new ApiError(`Films not found for this id ${id}`, 404))
    };
    res.status(200).json({ data: Film });
})

// @DESC  Update Film
// Route PUT /api/v1/subcategories/:id
// @access Privat
exports.updateFilm = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const Film = await filmModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        .populate([
            { path: 'category', select: 'name -_id' },
            { path: 'date', select: 'name -_id' },
            { path: 'section', select: 'name -_id' },
        ]);
    if (!Film) {
        return next(new ApiError(`Film not Update ${id}`, 404));
    }
    res.status(200).json({ data: Film });
})

// @DESC  dELETE Film
// Route DELETE /api/v1/subcategories/:id
// @access Privat
exports.deleteFilm = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const Film = await filmModel.findByIdAndDelete(id);
    if (!Film) {
        return next(new ApiError(`Films id not found for delete this: ${id}`, 404));
    }
    res.status(200).send(`Film ${id} deleted`);
})
