// const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const { User } = require("../services");
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

module.exports = {
	createUser,
	getUsers,
};
