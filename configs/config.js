const parse = require("parse-duration");
require("dotenv").config();

const config = {
	env: process.env.ENV,
	port: process.env.PORT || 8000,
	db: {
		uri: process.env.DB_URI,
		options: { useNewUrlParser: true, useUnifiedTopology: true },
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		accessExp: parse(process.env.JWT_ACCESS_EXP, "min"),
		refreshExp: parse(process.env.JWT_REFRESH_EXP, "min"),
		resetExp: parse(process.env.JWT_RESET_EXP, "min"),
		verifyExp: parse(process.env.JWT_VERIFY_EXP, "min"),
	},
	email: {
		smtp: {
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		},
		from: process.env.MAIL_FROM,
	},
};

module.exports = config;
