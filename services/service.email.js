const nodemailer = require("nodemailer");
const config = require("../configs/config");
const logger = require("../configs/logger");

const transport = nodemailer.createTransport(config.email.smtp);

const connect = () =>
	transport
		.verify()
		.then(() => logger.info("[SMTP]\t-> Connected to SMTP"))
		.catch((err) => {
			throw new Error(err, { cause: { service: "SMTP" } });
		});

const sendEmail = async (to, subject, text) => {
	const msg = { from: config.email.from, to, subject, text };
	await transport.sendMail(msg);
};

const sendResetPasswordEmail = async (to, token) => {
	const subject = "Reset password";
	const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`;
	const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`;
	await sendEmail(to, subject, text);
};

const sendVerificationEmail = async (to, token) => {
	const subject = "Email Verification";
	const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
	const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`;
	await sendEmail(to, subject, text);
};

module.exports = {
	SMTP: { connect },
	sendEmail,
	sendResetPasswordEmail,
	sendVerificationEmail,
};
