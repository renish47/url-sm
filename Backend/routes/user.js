const express = require('express');
const router = express.Router();

const userController = require("../controller/user");
const auth = require('../middleware/auth');

router.post("/create", userController.createUser);
router.post("/login", userController.getUser);
router.post("/verify-email", userController.checkOtp);
router.post("/resend-otp", userController.resendOtp);
router.post("/send-resetmail", userController.sendResetPasswordMail);
router.put("/reset-password", userController.resetPassword);
router.post("/url-validity", userController.checkUrlValidity);
router.get("/verify-userToken", auth, userController.checkUserToken);

module.exports = router;