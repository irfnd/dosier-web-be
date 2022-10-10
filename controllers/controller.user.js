const httpStatus = require("http-status");
const { User, File } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const roles = ["atasan", "pegawai"];

const createUser = catchAsync(async (req, res) => {
	const user = await User.createUser(req.body);
	res.json({ user });
});

const getUsers = catchAsync(async (req, res) => {
	const filter = pick(req.query, ["name", "role"]);
	const options = pick(req.query, ["sortBy", "limit", "page"]);
	const users = await User.queryUsers(filter, { ...options, limit: options.limit + 1 });
	const results = users.results.filter((el) => roles.includes(el.role));
	res.send({ ...users, results, totalResults: results.length });
});

const getUser = catchAsync(async (req, res) => {
	const user = await User.getUserById(req.params.userId);
	if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
	res.json({ user });
});

const updateUser = catchAsync(async (req, res) => {
	const { userId } = req.params;
	const data = { ...req.body };
	const user = await User.getUserById(userId);
	if (req.file) {
		if (user.photo.url && user.photo.path) File.deleteFile(user.photo.path);
		data.photo = File.uploadFile(req.file, { userId, folder: "photo" });
	}
	const results = await User.updateUserById(userId, data);
	res.json({ user: results });
});

const deleteUser = catchAsync(async (req, res) => {
	await User.deleteUserById(req.params.userId);
	res.status(httpStatus.NO_CONTENT).json();
});

module.exports = {
	createUser,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
};
