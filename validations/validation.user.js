const Joi = require("joi");
const joi = Joi.extend(require("joi-phone-number"));
const { objectId, password } = require("./validation.custom");

const createUser = {
	body: joi.object().keys({
		name: joi.string().required(),
		email: joi.string().required(),
		phone: joi.string().phoneNumber({ defaultCountry: "ID", format: "e164" }).required(),
		password: joi.string().required().custom(password),
		role: joi.string().valid("pegawai", "atasan"),
	}),
};

const getUsers = {
	query: Joi.object().keys({
		name: Joi.string(),
		role: Joi.string(),
		sortBy: Joi.string(),
		limit: Joi.number().integer(),
		page: Joi.number().integer(),
	}),
};

const getUserById = {
	params: Joi.object().keys({ userId: Joi.string().custom(objectId).required() }),
};

const getUserByEmail = {
	params: Joi.object().keys({ userEmail: Joi.string().required() }),
};

module.exports = {
	createUser,
	getUsers,
	getUserById,
	getUserByEmail,
};
