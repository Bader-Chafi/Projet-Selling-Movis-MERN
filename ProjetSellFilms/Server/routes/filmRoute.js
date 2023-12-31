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
    deleteFilm,
} = require("../controllers/filmController");

const userRoute = require('./userRoute')
const router = express.Router({ mergeParams: true });

router.use('/:filmId/users', userRoute)
router
    .route("/")
    .post(createfilmValidator, createFilm)
    .get(getFilms,);

router
    .route("/:id")
    .get(getFilmValidator, getFilm)
    .put(updatefilmValidator, updateFilm)
    .delete(deletefilmValidator, deleteFilm);



module.exports = router;
