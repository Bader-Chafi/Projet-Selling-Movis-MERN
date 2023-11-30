const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');

const Date = require('../models/dateModel');




// get list of dates
// rout get /api/v1/dates
exports.getdates = asyncHandler(async (req, res) => {
    const date = await Date.find({});
    res.status(200).json({ result: date.length, data: date });
});
// @DESC  GET SPICIFIQUE date
// Route get /api/v1/dates:id
// @access public
exports.getdate = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    // const { id } = req.params;
    const date = await Date.findById(id);
    if (!date) {
        return next(new ApiError(`date not found for this id ${id}`, 404))
    };
    res.status(200).json({ data: date });
})

// @DESC  CREATE Date
// Route POST /api/v1/dates
// @access Privat
exports.createDate = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const date = await Date.create({ name });
    res.status(201).json({ data: date })
});

// @DESC  Update dates
// Route PUT /api/v1/dates/:id
// @access Privat
exports.updateDate = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const date = await Date.findOneAndUpdate(
        { _id: id },
        { name },
        { new: true });
    if (!date) {
        return next(new ApiError(`date not Update ${id}`, 404));
    }
    res.status(200).json({ data: date });
})

// @DESC  dELETE date
// Route DELETE /api/v1/dates/:id
// @access Privat
exports.deleteDate = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const date = await Date.findByIdAndDelete(id);
    if (!date) {
        return next(new ApiError(`date id not found for delete this: ${id}`, 404));
    }
    res.status(200).send('date deleted');
})