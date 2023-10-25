const express = require('express');
const router = express.Router();
const multer = express('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../images"));
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname());
    }
})

// const upload = multer({ storage: storage });
const upload = multer({ storage });

router.post('/', upload.single("imageCover"), (req, res) => {
    res.status(200).json({ message: 'image uploaded' });
})

module.exports = express.router