const express = require("express");
const {
    getDateValidator,
    createDateValidator,
    updateDateValidator,
    deleteDateValidator
} = require('../utils/validators/dateValidator');
const {
    getdates,
    getdate,
    createDate,
    updateDate,
    deleteDate,
} = require("../controllers/dateController");

const filmRoute = require('./filmRoute')
const router = express.Router();

router.use('/:dateId/films', filmRoute)

router
    .route("/")
    .get(getdates)
    .post(createDateValidator,createDate);
    
router
    .route("/:id")
    .get(getDateValidator, getdate)
    .put(updateDateValidator,updateDate)
    .delete(deleteDateValidator,deleteDate);

module.exports = router;
