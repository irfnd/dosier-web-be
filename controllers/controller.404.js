const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");

const allMethods = (req, res, next) => next(new ApiError(httpStatus.NOT_FOUND, "Route not found!"));

module.exports = { allMethods };
