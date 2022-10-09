const app = require("./app");
const { DB } = require("./models");
const { SMTP } = require("./services/service.email");
const config = require("./configs/config");
const logger = require("./configs/logger");

let server;

(async () => {
	try {
		await Promise.all([DB.connect(), SMTP.connect()]);
		server = app.listen(config.port, () => logger.info(`[Express]\t-> Listening to port ${config.port}`));
	} catch (err) {
		logger.warn(`[${err.cause.service}] -> Unable to connect to ${err.cause.service}`);
		logger.error(err.message);
	}
})();

const exitHandler = () => {
	if (server) {
		server.close(() => {
			logger.info("Server closed");
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error) => {
	logger.error(error);
	exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
	logger.info("SIGTERM received");
	if (server) server.close();
});
