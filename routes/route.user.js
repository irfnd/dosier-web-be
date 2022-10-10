const router = require("express").Router();
const { Validate, Auth: Authorization, Multipart } = require("../middlewares");
const { User: validateUser } = require("../validations");
const { User } = require("../controllers");
const { photoProps } = require("../configs/fileProps");

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
