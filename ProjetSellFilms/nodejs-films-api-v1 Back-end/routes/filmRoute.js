const express = require("express");
const {
    getFilmValidator,
    createfilmValidator,
    updatefilmValidator,
    deletefilmValidator
} = require("../utils/validators/filmValidator");

const {
    createFilm,
    getFilms,
    getFilm,
    updateFilm,
    deleteFilm
} = require("../controllers/filmController");

// merge params : allow to acces parametrs on other routers 
// we ned to acces category id from category router
const router = express.Router({mergeParams: true});

router
    .route("/")
    .post(createfilmValidator, createFilm)
    .get(getFilms);

router
    .route("/:id")
    .get(getFilmValidator, getFilm)
    .put(updatefilmValidator, updateFilm)
    .delete(deletefilmValidator, deleteFilm);

module.exports = router;
