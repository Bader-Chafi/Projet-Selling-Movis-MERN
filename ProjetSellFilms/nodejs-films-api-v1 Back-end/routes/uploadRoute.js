const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
// upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./images");
    },
    filename: function (req, file, cb) {
        cb(null,`${Date.now()}_${file.originalname.replace(/\s+/g, '-')}`);
    }
})
// const upload = multer({ storage: storage });
const upload = multer({ storage });
app.post('/api/v1/upload', upload.single('image'), (req, res, next) => {
    const { file } = req
    res.status(200).send({
        path: file.path,
        message: 'image uploaded'
    });
});


router.post('/', upload.single("imageCover"), (req, res) => {
    res.status(200).json({ message: 'image uploaded' });
})

module.exports = express.router