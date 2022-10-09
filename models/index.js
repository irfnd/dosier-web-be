const mongoose = require("mongoose");
const config = require("../configs/config");

const connect = async () => {
	return mongoose
		.connect(config.db.uri, config.db.options)
		.catch((err) => new Error(err, { cause: { service: "MongoDB" } }));
};

module.exports = {
	DB: { connect },
	Token: require("./model.token"),
	User: require("./model.user"),
};
