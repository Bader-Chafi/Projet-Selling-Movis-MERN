const slugify = require("slugify");
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError');
const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const adminModel = require("../models/adminModel");

// @DESC  CREATE user
// Route POST /api/v1/users
// @access Privat
exports.createUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;
    // Hash the password
    const hashPassword = bcryptjs.hashSync(password, 10);
    const admin = email.endsWith('@admin.com');
    if (admin == true) {
        const newAdmin = new adminModel({
            email,
            password: hashPassword,
        });
        newAdmin.save();
        return res.status(201).json({ data: newAdmin });
    } else if (admin == false) {
        const newUser = new userModel({
            userName,
            email,
            password: hashPassword,
        });
        newUser.save();
        return res.status(201).json({ data: newUser });
    }

    // Respond with the created user
});


exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    const admin = await adminModel.findOne({ email })
    if (email.endsWith('@admin.com')) {
        if (bcryptjs.compareSync(password, admin.password)) {
            const token = jwt.sign({ id: admin._id }, '455SSDFSDFDF54SD5')
            const { password: hashPassword, ...rest } = admin._doc;
            const expire = new Date(Date.now() + 3600000);
            return res.cookie('access_token', token, { httpOnly: true }, expire).status(200).json({ msg: 'OK', token: token, data: rest });
        } else {
            return res.status(401).json({ msg: 'NO' });
        }
    } else if (user) {
        if (!user || !bcryptjs.compareSync(password, user.password)) {
            return res.status(401).json({ msg: 'NO' });
        } else {
            const token = jwt.sign({ id: user._id }, '455SSDFSDFDF54SD5')
            const { password: hashPassword, ...rest } = user._doc;
            const expire = new Date(Date.now() + 3600000);
            return res.cookie('access_token', token, { httpOnly: true }, expire).status(200).json({ msg: 'OK', token: token, data: rest });
        }
    }



    // If the user is found and password is correct, respond with a success message
});
// nester route get films of users
// Get /api/v1/films/:filmsId/user 

// get list of users
// rout get /api/v1/users
exports.getUsers = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    const felterObject = {};
    if (req.params.filmId) {
        felterObject.film = req.params.filmId;
    }
    const Users = await userModel.find(felterObject).skip(skip).limit(limit);
    res.status(200).json({ result: Users.length, page, data: Users });
});

// @DESC  GET SPICIFIQUE user
// Route get /api/v1/users/:id
// @access public
exports.getUser = asyncHandler(async (req, res, next) => {
    // req.body.slug = slugify(req.body.title);
    const id = req.params.id;
    const User = await userModel.findById({ _id: id });
    if (!User) {
        return next(new ApiError(`User not found for this id ${id}`, 404))
    };
    res.status(200).json({ data: User });
})

// @DESC  Update User
// Route PUT /api/v1/users/:id
// @access Privat
exports.updateUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.userName) {
        req.body.slug = slugify(req.body.userName);
    }
    const User = await userModel.findOneAndUpdate({ _id: id }, req.body, { new: true });
    console.log(User)
    if (!User) {
        return next(new ApiError(`User not Update ${id}`, 404));
    }
    res.status(200).json({ data: User });
})

// @DESC  dELETE User
// Route DELETE /api/v1/users/:id
// @access Privat
exports.deleteUser = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const User = await userModel.findByIdAndDelete(id);
    if (!User) {
        return next(new ApiError(`Users id not found for delete this: ${id}`, 404));
    }
    res.status(200).send(`User ${User.userName} deleted`);
})
