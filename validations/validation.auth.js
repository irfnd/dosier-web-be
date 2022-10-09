const joi = require("joi");
const { password } = require("./validation.custom");

const login = {
	body: joi.object().keys({
		email: joi.string().required(),
		password: joi.string().required(),
	}),
};

const logout = {
	body: joi.object().keys({ refreshToken: joi.string().required() }),
};

const refreshTokens = {
	body: joi.object().keys({ refreshToken: joi.string().required() }),
};

const forgotPassword = {
	body: joi.object().keys({ email: joi.string().email().required() }),
};

const resetPassword = {
	query: joi.object().keys({ token: joi.string().required() }),
	body: joi.object().keys({ password: joi.string().required().custom(password) }),
};

const verifyEmail = {
	query: joi.object().keys({ token: joi.string().required() }),
};

module.exports = {
	login,
	logout,
	refreshTokens,
	forgotPassword,
	resetPassword,
	verifyEmail,
};
