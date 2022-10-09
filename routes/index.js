const router = require("express").Router();

const defaultRoutes = [
	{ path: "/auth", route: require("./route.auth") },
	{ path: "/users", route: require("./route.user") },
	{ path: "*", route: require("./route.404") },
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
