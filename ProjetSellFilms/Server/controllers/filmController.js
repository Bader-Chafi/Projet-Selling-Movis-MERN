const slugify = require("slugify");
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');
const Film = require('../models/filmModel')
const filmModel = require("../models/filmModel");

// @DESC  CREATE Films
// Route POST /api/v1/subcategories
// @access Privat
exports.createFilm = asyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title);
    // Create a new film instance with the adjusted file paths
    const film = new filmModel({
        title: req.body.title,
        category: req.body.category,
        date: req.body.date,
        section: req.body.section,
        imageCover: req.body.imageCover.replace("C:\\fakepath\\", ""), // Adjust the path as needed
        video: req.body.video.replace("C:\\fakepath\\", ""), // Adjust the path as needed
        price: req.body.price,
        sold: req.body.sold,
        description: req.body.description,
        slug: req.body.slug,
        // Add other film properties as needed
    });
    // Save the film to the database
    const createdFilm = await film.save();

    res.status(201).json({ data: createdFilm });
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
        return next(new ApiError(`Film not found for this id ${id}`, 404));
    }
    // Extract only the name property for category, date, and section
    const formattedFilm = {
        ...Film.toObject(),
        category: Film.category ? Film.category.name : null,
        date: Film.date ? Film.date.name : null,
        section: Film.section ? Film.section.name : null,
    };

    res.status(200).json({ data: formattedFilm });
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


exports.searchFilm = asyncHandler(async (req, res) => {
    try {
        //query parameters
        const { title, category, section, date, pageSize, limit } = req.query;
        const page = pageSize * 1;
        const limited = limit * 1;

        // Build the query object dynamically
        const querySearch = {};
        if (title) querySearch.title = { $regex: new RegExp(title, 'i') };
        if (category) querySearch.category = category;
        if (section) querySearch.section = section;
        if (date) querySearch.date = date;

        // Calculate the skip value based on the current page and page size
        const skip = (page - 1) * limited;

        // Perform the search
        const searchResults = await Film.find(querySearch)
            .skip(skip)
            .limit(limited);

        console.log(title, category, section, date);

        // Respond with the search results
        res.json({ result: searchResults.length, page, data: searchResults });
    } catch (error) {
        console.error('Error searching films:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
