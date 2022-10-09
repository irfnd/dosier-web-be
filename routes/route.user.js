const router = require("express").Router();
const { Validate, Auth: Authorization } = require("../middlewares");
const { User: validateUser } = require("../validations");
const { User } = require("../controllers");

router
	.route("/")
	.get(Authorization("manageUsers"), Validate(validateUser.getUsers), User.getUsers)
	.post(Authorization("manageUsers"), Validate(validateUser.createUser), User.createUser);

router.route("/id/:userId").get(Authorization("manageUsers"), Validate(validateUser.getUserById), User.getUserById);
router
	.route("/email/:userEmail")
	.get(Authorization("manageUsers"), Validate(validateUser.getUserByEmail), User.getUserByEmail);

module.exports = router;
