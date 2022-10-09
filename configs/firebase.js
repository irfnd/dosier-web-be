const { initializeApp, cert } = require("firebase-admin/app");
const { getStorage } = require("firebase-admin/storage");
const config = require("./config");

initializeApp({ credential: cert(config.firebase.admin), storageBucket: config.firebase.bucket });

const bucket = getStorage().bucket();

module.exports = {
	bucket,
};
