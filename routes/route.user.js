const router = require("express").Router();
const { Validate, Auth: Authorization } = require("../middlewares");
const { User: validateUser } = require("../validations");
const { User } = require("../controllers");

router
	.route("/")
	.get(Authorization("manageUsers"), Validate(validateUser.getUsers), User.getUsers)
	.post(Authorization("manageUsers"), Validate(validateUser.createUser), User.createUser);

module.exports = router;
