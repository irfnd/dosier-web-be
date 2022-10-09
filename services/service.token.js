const jwt = require("jsonwebtoken");
const httpStatus = require("http-status");
const moment = require("moment");
const config = require("../configs/config");
const { Token } = require("../models");
const UserService = require("./service.user");
const tokenTypes = require("../configs/tokens");
const ApiError = require("../utils/ApiError");

const generateToken = (userId, expires, type) => {
	const payload = { sub: userId, iat: moment().unix(), exp: expires.unix(), type };
	return jwt.sign(payload, config.jwt.secret);
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
	const tokenDoc = await Token.create({ token, user: userId, expires: expires.toDate(), type, blacklisted });
	return tokenDoc;
};

const verifyToken = async (token, type) => {
	const payload = jwt.verify(token, config.jwt.secret);
	const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
	if (!tokenDoc) throw new Error("Token not found");
	return tokenDoc;
};

const generateAuthTokens = async (user) => {
	const accessTokenExp = moment().add(config.jwt.accessExp, "minutes");
	const refreshTokenExp = moment().add(config.jwt.refreshExp, "minutes");
	const accessToken = generateToken(user.id, accessTokenExp, tokenTypes.ACCESS);
	const refreshToken = generateToken(user.id, refreshTokenExp, tokenTypes.REFRESH);
	await saveToken(refreshToken, user.id, refreshTokenExp, tokenTypes.REFRESH);
	return {
		access: { token: accessToken, expires: accessTokenExp.toDate() },
		refresh: { token: refreshToken, expires: refreshTokenExp.toDate() },
	};
};

const generateResetPasswordToken = async (email) => {
	const user = await UserService.getUserByEmail(email);
	if (!user) throw new ApiError(httpStatus.NOT_FOUND, "No users found with this email");
	const expires = moment().add(config.jwt.resetExp, "minutes");
	const resetPasswordToken = generateToken(user.id, expires, tokenTypes.RESET_PASSWORD);
	await saveToken(resetPasswordToken, user.id, expires, tokenTypes.RESET_PASSWORD);
	return resetPasswordToken;
};

const generateVerifyEmailToken = async (user) => {
	const expires = moment().add(config.jwt.verifyExp, "minutes");
	const verifyEmailToken = generateToken(user.id, expires, tokenTypes.VERIFY_EMAIL);
	await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);
	return verifyEmailToken;
};

module.exports = {
	generateToken,
	saveToken,
	verifyToken,
	generateAuthTokens,
	generateResetPasswordToken,
	generateVerifyEmailToken,
};
