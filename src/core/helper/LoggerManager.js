const winston = require("winston");
const morgan = require("morgan");

class LoggerManager {

	static create(...opts) {
		return new this(...opts);
	}

	constructor(options = {}) {
		this.setOptions(options);
		this.initLogger();
	}

	setOptions(options) {
		for (var option in options) {
			this[option] = options[option];
		}
	}

	initLogger() {
		
		this.$logger = winston.createLogger({
			transports: [
				new winston.transports.File({
					level: "info",
					filename: process.env.PROJECT_ROOT + "/../log/info.log",
					handleExceptions: true,
					json: true,
					maxsize: 5242880, //5MB
					maxFiles: 5,
					colorize: false
				}),
				new winston.transports.File({
					level: "error",
					filename: process.env.PROJECT_ROOT + "/../log/error.log",
					handleExceptions: true,
					json: true,
					maxsize: 5242880, //5MB
					maxFiles: 5,
					colorize: false
				}),
				new winston.transports.Console({
					level: "debug",
					handleExceptions: true,
					json: false,
					colorize: true
				})
			],
			exitOnError: false
		});

		this.$logger.stream = {
			write: (message, encoding) => {
				this.$logger.info(message);
			}
		};

		this.$middleware = morgan("combined", { stream: this.$logger.stream });

	}

	get() {
		return this.$logger;
	}

	getMiddleware() {
		return this.$middleware;
	}

}

module.exports = LoggerManager;