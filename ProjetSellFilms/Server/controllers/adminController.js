const asyncHandler = require('express-async-handler')
const adminModel = require("../models/adminModel");
const bcryptjs = require('bcryptjs');

// @DESC  CREATE admin
// Route POST /api/v1/admin
// @access Privat
exports.createAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // Hash the password
    const hashPassword = bcryptjs.hashSync(password, 10); // You can adjust the salt rounds
    // Create a new admin with the hashed password
    const admin = await adminModel.create({
        email,
        password: hashPassword,
    });
    // Respond with the created admin
    res.status(201).json({ data: admin });
});


// exports.loginAdmin = asyncHandler(async (req, res) => {
//     const { email, password } = req.body;
//     const admin = await adminModel.findOne({ email });
//     // If user is not found, or password is incorrect, respond with an error
//     if (!user || !bcryptjs.compareSync(password, user.password)) {
//         return res.status(401).json({ msg: 'NO' });
//     } else {
//         const token = jwt.sign({id: user._id},'455SSDFSDFDF54SD5')
//         const {password:hashPassword, ...rest} = user._doc;
//         const expire = new Date(Date.now() +3600000);
//         return res.cookie('access_token', token, {httpOnly: true}, expire).status(200).json({msg: 'OK', token:token, data: rest});
//     }
//     // If the user is found and password is correct, respond with a success message
// });
