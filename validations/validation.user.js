const Joi = require("joi");
const joi = Joi.extend(require("joi-phone-number"));
const { objectId, password } = require("./validation.custom");

const createUser = {
	body: joi.object().keys({
		nip: joi.number().required(),
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

const getUser = {
	params: joi.object().keys({ userId: joi.string().custom(objectId).required() }),
};

const updateUser = {
	params: Joi.object().keys({ userId: Joi.required().custom(objectId).required() }),
	body: Joi.object()
		.keys({
			name: joi.string(),
			email: joi.string(),
			phone: joi.string().phoneNumber({ defaultCountry: "ID", format: "e164" }),
			password: joi.string().custom(password),
			role: joi.string().valid("pegawai", "atasan"),
			photo: joi.object().keys({ url: joi.string(), fileName: joi.string() }),
		})
		.min(1),
};

const deleteUser = {
	params: joi.object().keys({ userId: joi.string().custom(objectId).required() }),
};

module.exports = {
	createUser,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
};
