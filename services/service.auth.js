const httpStatus = require("http-status");
const { Token } = require("../models");
const TokenService = require("./service.token");
const User = require("./service.user");
const tokenTypes = require("../configs/tokens");
const ApiError = require("../utils/ApiError");

const loginAdmin = async (email, password) => {
	const user = await User.getUserByEmail(email);
	if (!user || !(await user.isPasswordMatch(password)))
		throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
	if (user.role !== "admin") throw new ApiError(httpStatus.UNAUTHORIZED, "You are not admin");
	return user;
};

const loginUser = async (email, password) => {
	const user = await User.getUserByEmail(email);
	if (!user || !(await user.isPasswordMatch(password)))
		throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
	if (user.role === "admin") throw new ApiError(httpStatus.UNAUTHORIZED, "You are admin, login to correct endpoint");
	return user;
};

const logout = async (refreshToken) => {
	const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
	if (!refreshTokenDoc) throw new ApiError(httpStatus.NOT_FOUND, "Not found");
	await refreshTokenDoc.remove();
};

const refreshAuth = async (refreshToken) => {
	try {
		const refreshTokenDoc = await TokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
		const user = await User.getUserById(refreshTokenDoc.user);
		if (!user) throw new Error();
		await refreshTokenDoc.remove();
		return TokenService.generateAuthTokens(user);
	} catch (error) {
		throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
	}
};

const resetPassword = async (resetPasswordToken, newPassword) => {
	try {
		const resetPasswordTokenDoc = await TokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
		const user = await User.getUserById(resetPasswordTokenDoc.user);
		if (!user) throw new Error();
		await User.updateUserById(user.id, { password: newPassword });
		await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
	} catch (error) {
		throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
	}
};

const verifyEmail = async (verifyEmailToken) => {
	try {
		const verifyEmailTokenDoc = await TokenService.verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
		const user = await User.getUserById(verifyEmailTokenDoc.user);
		if (!user) throw new Error();
		await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
		await User.updateUserById(user.id, { verified: true });
	} catch (error) {
		throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed");
	}
};

module.exports = {
	loginUser,
	loginAdmin,
	logout,
	refreshAuth,
	resetPassword,
	verifyEmail,
};
