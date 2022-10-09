const router = require("express").Router();
const { Validate, Auth: Authorization } = require("../middlewares");
const { Auth: validateAuth } = require("../validations");
const { Auth } = require("../controllers");

router.post("/login", Validate(validateAuth.login), Auth.login);
router.post("/login-admin", Validate(validateAuth.login), Auth.loginAdmin);
router.post("/refresh-tokens", Validate(validateAuth.refreshTokens), Auth.refreshTokens);
router.post("/forgot-password", Validate(validateAuth.forgotPassword), Auth.forgotPassword);
router.post("/reset-password", Validate(validateAuth.resetPassword), Auth.resetPassword);
router.post("/send-verification", Authorization(), Auth.sendVerificationEmail);
router.post("/verify", Validate(validateAuth.verifyEmail), Auth.verifyEmail);
router.post("/logout", Validate(validateAuth.logout), Auth.logout);

module.exports = router;
