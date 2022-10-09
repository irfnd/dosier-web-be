const httpStatus = require("http-status");
const { User } = require("../services");
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

const getUserById = catchAsync(async (req, res) => {
	const user = await User.getUserById(req.params.userId);
	if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
	res.json({ user });
});

const getUserByEmail = catchAsync(async (req, res) => {
	const user = await User.getUserByEmail(req.params.userEmail);
	if (!user) throw new ApiError(httpStatus.NOT_FOUND, "User not found");
	res.json({ user });
});

module.exports = {
	createUser,
	getUsers,
	getUserById,
	getUserByEmail,
};
