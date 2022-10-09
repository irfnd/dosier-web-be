const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { Auth, Token, Email } = require("../services");

const login = catchAsync(async (req, res) => {
	const { email, password } = req.body;
	const user = await Auth.loginUser(email, password);
	const tokens = await Token.generateAuthTokens(user);
	res.json({ user, tokens });
});

const loginAdmin = catchAsync(async (req, res) => {
	const { email, password } = req.body;
	const user = await Auth.loginAdmin(email, password);
	const tokens = await Token.generateAuthTokens(user);
	res.json({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
	await Auth.logout(req.body.refreshToken);
	res.status(httpStatus.NO_CONTENT).json();
});

const refreshTokens = catchAsync(async (req, res) => {
	const tokens = await Auth.refreshAuth(req.body.refreshToken);
	res.json({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
	const resetPasswordToken = await Token.generateResetPasswordToken(req.body.email);
	await Email.sendResetPasswordEmail(req.body.email, resetPasswordToken);
	res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
	await Auth.resetPassword(req.query.token, req.body.password);
	res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
	const verifyEmailToken = await Token.generateVerifyEmailToken(req.user);
	await Email.sendVerificationEmail(req.user.email, verifyEmailToken);
	res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
	await Auth.verifyEmail(req.query.token);
	res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
	login,
	loginAdmin,
	logout,
	refreshTokens,
	forgotPassword,
	resetPassword,
	sendVerificationEmail,
	verifyEmail,
};
