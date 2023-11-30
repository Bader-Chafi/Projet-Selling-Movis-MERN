const express = require("express");
const {
    createUserValidator,
    getUserValidator,
    updateUserValidator,
    deleteUserValidator,
} = require("../utils/validators/userValidator");
const {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
} = require("../controllers/userController");


const router = express.Router({ mergeParams: true });

router
    .route("/")
    .post(createUserValidator, createUser)
    .get(getUsers);

router
    .route("/:id")
    .get(getUserValidator, getUser)
    .put(updateUserValidator, updateUser)
    .delete(deleteUserValidator, deleteUser);


module.exports = router;
