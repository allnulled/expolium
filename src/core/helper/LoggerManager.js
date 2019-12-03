const winston = require("winston");
const morgan = require("morgan");

class LoggerManager {

	static create(...opts) {
		return new this(...opts);
	}

	constructor(options = {}) {
		this.source = undefined;
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
				const prefix = this.source ? "[" + this.source + "]> " : "";
				this.$logger.info(prefix + message);
			}
		};

		this.$middleware = morgan("combined", {
			stream: this.$logger.stream
		});

	}

	get() {
		return this.$logger;
	}

	getMiddleware() {
		return this.$middleware;
	}

	error(...args) {
		if(this.source) {
			this.$logger.error(this.source + " says:");
		}
		return this.$logger.error(...args);
	}

	warn(...args) {
		if(this.source) {
			this.$logger.warn(this.source + " says:");
		}
		return this.$logger.warn(...args);
	}

	info(...args) {
		if(this.source) {
			this.$logger.info(this.source + " says:");
		}
		return this.$logger.info(...args);
	}

	verbose(...args) {
		if(this.source) {
			this.$logger.verbose(this.source + " says:");
		}
		return this.$logger.verbose(...args);
	}

	debug(...args) {
		if(this.source) {
			this.$logger.debug(this.source + " says:");
		}
		return this.$logger.debug(...args);
	}

	silly(...args) {
		if(this.source) {
			this.$logger.silly(this.source + " says:");
		}
		return this.$logger.silly(...args);
	}

}

module.exports = LoggerManager;