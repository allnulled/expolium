const packageData = require(process.env.PROJECT_ROOT + "/../package.json");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const ejs = require("ejs");
const fs = require("fs");

class ResponseManager {

	static get HTTP_CODES() {
		return {
			100: "Continue",
			101: "Switching protocols",
			200: "OK",
			201: "Created",
			202: "Accepted",
			203: "Non-authoritative information",
			204: "No content",
			205: "Reset content",
			206: "Partial content",
			300: "Multiple choices",
			301: "Moved permanently",
			302: "Moved temporarily",
			303: "See other",
			304: "Not modified",
			305: "Use proxy",
			306: "Unused",
			307: "Temporary redirect",
			400: "Bad request",
			401: "Unauthorized",
			402: "Payment required",
			403: "Forbidden",
			404: "Not found",
			405: "Method not allowed",
			406: "Not acceptable",
			407: "Proxy authentication required",
			408: "Request timeout",
			409: "Conflict",
			410: "Gone",
			411: "Length required",
			412: "Precondition failed",
			413: "Request entity too large",
			414: "Request-URI yoo long",
			415: "Unsupported media type",
			416: "Requested range not satisfiable",
			417: "Expectation failed",
			426: "Upgrade required",
			428: "Precondition required",
			429: "Too many requests",
			431: "Request header fields too large",
			500: "Internal server error",
			501: "Not implemented",
			502: "Bad gateway",
			503: "Service unavailable",
			504: "Gateway timeout",
			505: "HTTP version not supported",
			511: "Network authentication required"
		}
	}

	static getHttpCode(code = 200) {
		return this.HTTP_CODES[code];
	}

	static getStandardResponse(data = {}, metadata = {}, code = 400) {
		const isSuccess = code < 300;
		return Object.assign({}, {
			app: {
				name: "Custom REST API",
				version: packageData.version,
			},
			[isSuccess ? "success" : "failure"]: true,
			status: {
				is: isSuccess ? "success" : "failure",
				code: code,
				message: this.HTTP_CODES[code]
			},
			[isSuccess ? "data" : "error"]: data,
			metadata
		})
	}

	static create(...args) {
		return new ResponseManager(...args);
	}

	constructor(request, response, next) {
		this.request = request;
		this.response = response;
		this.next = next;
	}

	success(data, metadata = {}, code = 200) {
		return this.dispatch(data, metadata, code);
	}

	error(data, metadata = {}, code = 500) {
		return this.dispatch(data, metadata, code);
	}

	dispatch(data, metadata = {}, code = 500) {
		return this.response.status(code).json(this.constructor.getStandardResponse(data, metadata, code)).send();
	}

	successHtml(text, code = 200) {
		return this.dispatchHtml(text, code);
	}

	errorHtml(text, code = 500) {
		return this.dispatchHtml(text, code);
	}

	dispatchHtml(text, code = 500) {
		return this.response.status(code).send(text);
	}

	successEjsFile(file, parameters = {}, options = {}, code = 200) {
		return this.dispatchEjsFile(file, parameters, options, code);
	}

	errorEjsFile(file, parameters = {}, options = {}, code = 500) {
		return this.dispatchEjsFile(file, parameters, options, code);
	}

	dispatchEjsFile(file, parameters = {}, options = {}, code = 200) {
		return fs.exists(file, exists => {
			if(!exists) {
				return this.next();
			}
			return fs.readFile(file, "utf8", (error, data) => {
				if(error) {
					return this.response.status(500).send("Error reading file");
				}
				const result = ejs.render(data, parameters, options);
				return this.response.status(code).send(result);
			});
		});
	}

	successFile(file, code = 200) {
		return this.dispatchFile(file, parameters, options, code);
	}

	errorFile(file, code = 500) {
		return this.dispatchFile(file, parameters, options, code);
	}

	dispatchFile(file, code = 200, ignoreError = false) {
		return fs.exists(file, exists => {
			if(!exists) {
				if(ignoreError) {
					return this.next();
				} else {
					return this.error(new ErrorManager.classes.FileNotFound());
				}
			}
			return fs.readFile(file, "utf8", (error, data) => {
				if(error) {
					return this.response.status(500).json(error);
				}
				return this.response.status(code).send(data);
			});
		});
	}

}

module.exports = ResponseManager;