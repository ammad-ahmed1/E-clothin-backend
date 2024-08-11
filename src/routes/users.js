const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/getusers", userController.signup_get);

router.post("/signup", userController.signup_post);

router.post("/login", userController.login);

//router.post("/login", userController.login_post);

router.get("/auth/google", userController.google_get);

router.get("/auth/google/callback", userController.google_callback);

router.get("/logout", userController.logout_get);

router.get("/loggedin", userController.loggedIn);

module.exports = router;
