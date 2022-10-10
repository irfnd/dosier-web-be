const router = require("express").Router();
const { Validate, Auth: Authorization, Multipart } = require("../middlewares");
const { User: validateUser } = require("../validations");
const { User } = require("../controllers");

const photoProps = {
	fieldName: "photo",
	fileTypes: { "image/jpg": ".jpg", "image/jpeg": ".jpeg", "image/png": ".png" },
	limit: "2MB",
};

router
	.route("/")
	.get(Authorization("manageUsers"), Validate(validateUser.getUsers), User.getUsers)
	.post(Authorization("manageUsers"), Validate(validateUser.createUser), User.createUser);

router
	.route("/:userId")
	.get(Authorization("manageUsers"), Validate(validateUser.getUser), User.getUser)
	.patch(Authorization("manageUsers"), Multipart(photoProps), Validate(validateUser.updateUser), User.updateUser)
	.delete(Authorization("manageUsers"), Validate(validateUser.deleteUser), User.deleteUser);

module.exports = router;
