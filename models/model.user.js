const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { roles } = require("../configs/roles");
const { toJSON, Paginate } = require("./plugin");

const userSchema = mongoose.Schema({
	name: { type: String, trim: true, maxLength: 50, required: true },
	email: { type: String, unique: true, trim: true, maxLength: 100, lowercase: true, required: true },
	phone: { type: String, trim: true, maxLength: 25, unique: true, required: true },
	password: { type: String, minlength: 8, trim: true, private: true, required: true },
	role: { type: String, enum: roles, default: "pegawai" },
	verified: { type: Boolean, default: false },
});

userSchema.plugin(toJSON);
userSchema.plugin(Paginate);

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
	const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
	return !!user;
};

userSchema.methods.isPasswordMatch = async function (password) {
	const user = this;
	return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
	const user = this;
	if (user.isModified("password")) {
		user.password = await bcrypt.hash(user.password, 10);
	}
	next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
