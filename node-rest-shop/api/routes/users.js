const express = require("express");
const router = express.Router();
const UsersController = require('../controllers/users');

router.post('/signup',UsersController.users_signup);

router.post('/login',UsersController.users_login);

module.exports = router;