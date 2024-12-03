const express = require("express");
const router = express.Router();
const { signIn, signUp, authMe } = require("../controllers/auth");
const verifyToken = require("../verifyToken");

router.route("/signin").post(signIn);
router.route("/signup").post(signUp);
router.route("/me", verifyToken).get(authMe);

module.exports = router;
