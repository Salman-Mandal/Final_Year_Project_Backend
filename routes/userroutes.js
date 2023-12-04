const express = require("express");
const { registerUser, loginUser, logoutUser, getAllUser, getUserDetails } = require("../controllers/userControllers");
const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/user").get(getAllUser);
router.route("/me").get(isAuthenticatedUser, getUserDetails);


module.exports = router;