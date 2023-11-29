const express = require("express");

const {
    searchFilm,
} = require("../controllers/filmController");

const router = express.Router();
router
    .route("/")
    .get(searchFilm)

module.exports = router;