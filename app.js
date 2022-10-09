const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const compression = require("compression");
const passport = require("passport");
const morgan = require("./configs/morgan");
const config = require("./configs/config");
const { jwtStrategy } = require("./configs/passport");
const { Error } = require("./middlewares");
const routes = require("./routes");

// Initialize App
const app = express();

// Middlewares
if (config.env !== "test") {
	app.use(morgan.successHandler);
	app.use(morgan.errorHandler);
}

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// Routes
app.use("/", routes);

// Handling API Error
app.use(Error.errorConverter);
app.use(Error.errorHandler);

module.exports = app;
