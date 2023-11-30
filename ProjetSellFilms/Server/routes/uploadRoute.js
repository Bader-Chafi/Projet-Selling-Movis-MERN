const express = require('express');
const multer = require('multer');

// upload image
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./images");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });
const router = express.Router();

router.post('/', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]), (req, res) => {
    const { files } = req;
    const imageFile = files['image'][0];
    const videoFile = files['video'][0];

    res.status(200).send({
        videoPath: videoFile.path,
        imagePath: imageFile.path,
        // imageName: imageFile.originalname,
        // videoName: videoFile.originalname,
        message: 'Files uploaded',
    });
});

module.exports = router;