const httpStatus = require("http-status");
const { bucket } = require("../configs/firebase");
const ApiError = require("../utils/ApiError");

const uploadFile = (file, options) => {
	const blob = bucket.file(`${options.userId}/${options.folder}/${options.folder}-${options.userId}-${Date.now()}`);
	const blobWriter = blob.createWriteStream({ metadata: { contentType: file.mimetype } });
	blobWriter.on("finish", () => blob.makePublic());
	blobWriter.on("error", () => new ApiError(httpStatus.BAD_REQUEST, "File unable to upload!"));
	blobWriter.end(file.buffer);
	return { url: blob.publicUrl(), path: blob.name };
};

const deleteFile = async (path) => {
	return bucket.file(path).delete();
};

const deleteFolder = async (userId) => {
	return bucket.deleteFiles({ prefix: `${userId}/` });
};

module.exports = {
	uploadFile,
	deleteFile,
	deleteFolder,
};
