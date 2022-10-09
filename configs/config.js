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
	firebase: {
		admin: {
			type: process.env.TYPE,
			project_id: process.env.PROJECT_ID,
			private_key_id: process.env.PRIVATE_KEY_ID,
			private_key: process.env.PRIVATE_KEY,
			client_email: process.env.CLIENT_EMAIL,
			client_id: process.env.CLIENT_ID,
			auth_uri: process.env.AUTH_URI,
			token_uri: process.env.TOKEN_URI,
			auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_CERT,
			client_x509_cert_url: process.env.CLIENT_CERT,
		},
		bucket: process.env.BUCKET_NAME,
	},
};

module.exports = config;
