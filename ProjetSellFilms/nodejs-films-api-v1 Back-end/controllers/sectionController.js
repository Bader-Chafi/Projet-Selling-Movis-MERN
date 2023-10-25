const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');

const Section = require('../models/sectionModel');
const slugify = require('slugify');

// get list of sections
// rout get /api/v1/sections
exports.getsections = asyncHandler(async (req, res) => {
    const section = await Section.find({});
    res.status(200).json({ result: section.length, data: section });
});
// @DESC  GET SPICIFIQUE section
// Route get /api/v1/sections:id
// @access public
exports.getsection = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const section = await Section.findById(id);
    if (!section) {
        return next(new ApiError(`section not found for this id ${id}`, 404))
    };
    res.status(200).json({ data: section });
})

// @DESC  CREATE section
// Route POST /api/v1/sections
// @access Privat
exports.createSection = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const section = await Section.create({ name , slug: slugify(name) });
    res.status(201).json({ data: section })
});

// @DESC  Update section
// Route PUT /api/v1/sections/:id
// @access Privat
exports.updateSection = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const section = await Section.findOneAndUpdate(
        { _id: id },
        { name, slug: slugify(name) },
        { new: true });
    if (!section) {
        return next(new ApiError(`section not Update ${id}`, 404));
    }
    res.status(200).json({ data: section });
})

// @DESC  dELETE date
// Route DELETE /api/v1/dates/:id
// @access Privat
exports.deleteSection = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const section = await Section.findByIdAndDelete({_id: id});
    if (!section) {
        return next(new ApiError(`Section id not found for delete this: ${id}`, 404));
    }
    res.status(200).send('Section deleted');
})