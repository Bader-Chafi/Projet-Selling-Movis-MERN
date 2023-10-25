const express = require("express");

const {
    getsections,
    getsection,
    createSection,
    updateSection,
    deleteSection
} = require('../controllers/sectionController');

const {
    getSectionValidator,
    createSectionValidator,
    updateSectionValidator,
    deleteSectionValidator
} = require('../utils/validators/sectionValidator');

const filmRoute = require('./filmRoute')

const router = express.Router();
router.use('/:sectionId/films', filmRoute)


router
    .route('/')
    .get(getsections)
    .post(createSectionValidator, createSection)
router
    .route('/:id')
    .get(getSectionValidator, getsection)
    .put(updateSectionValidator, updateSection)
    .delete(deleteSectionValidator, deleteSection)


module.exports = router;
