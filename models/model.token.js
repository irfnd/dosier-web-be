const mongoose = require("mongoose");
const tokenTypes = require("../configs/tokens");
const { toJSON } = require("./plugin");

const allowedType = [tokenTypes.REFRESH, tokenTypes.RESET_PASSWORD, tokenTypes.VERIFY_EMAIL];

const tokenSchema = mongoose.Schema({
	token: { type: String, required: true, index: true },
	user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
	type: { type: String, enum: allowedType, required: true },
	expires: { type: Date, required: true },
	blacklisted: { type: Boolean, default: false },
});

tokenSchema.plugin(toJSON);

const Token = mongoose.model("Token", tokenSchema);

module.exports = Token;
