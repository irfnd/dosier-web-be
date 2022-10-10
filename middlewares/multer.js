const multer = require("multer");
const parseSize = require("filesize-parser");

const upload = ({ fieldName, fileTypes, limit }) => {
	const mimetypes = Object.keys(fileTypes);
	const extensions = Object.values(fileTypes).join(", ");

	return multer({
		storage: multer.memoryStorage(),
		limits: { fileSize: parseSize(limit) },
		fileFilter: (req, file, cb) => {
			if (mimetypes.includes(file.mimetype)) {
				cb(null, true);
			} else {
				cb(null, false);
				return cb(new Error(`Only ${extensions} format allowed!`));
			}
		},
	}).single(fieldName);
};

module.exports = upload;
