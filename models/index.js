const mongoose = require("mongoose");
const config = require("../configs/config");
const logger = require("../configs/logger");

const connect = () =>
	mongoose
		.connect(config.db.uri, config.db.options)
		.then(() => logger.info("[MongoDB]\t-> Connected to MongoDB"))
		.catch((err) => {
			throw new Error(err, { cause: { service: "MongoDB" } });
		});

module.exports = {
	DB: { connect },
	Token: require("./model.token"),
	User: require("./model.user"),
};
