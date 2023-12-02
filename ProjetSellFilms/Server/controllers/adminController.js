const asyncHandler = require('express-async-handler')
const adminModel = require("../models/adminModel");

// @DESC  get specific admin
// Route POST /api/v1/admins/:id
// @access Privat
exports.getAdmin = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const admin = await adminModel.findById({ _id: id });
    if (admin) {
        res.status(200).send({ data: admin });
    }
    res.status(404).send({ msg: 'Admin not found' })
})

// get list of admins
// rout get /api/v1/admins
exports.getAllAdmins = asyncHandler(async (req, res) => {
    const admins = await adminModel.find();
    res.status(200).json({ result: admins.length, data: admins });
});