const AppResponseLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("AppResponse");
const OverridableClass = require(process.env.PROJECT_ROOT + "/core/helper/OverridableClass.js")
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js")

class AppResponse extends OverridableClass {

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

	get defaultData() {
		return {
			//data: ""
		}
	}

	onSetHeaders(response, headers) {
		AppResponseLogger.log("onSetHeaders");
		if (headers) {
			response.set(headers);
		}
	}

	onSetExtra(responseData, output) {
		AppResponseLogger.log("onSetExtra");
		responseData.status = {
			is: output.code >= 100 && output.code < 300 ? "success" : "error",
			code: output.code,
			message: this.constructor.getHttpCode(output.code),
		}
	}

	onSetData(responseData, data) {
		AppResponseLogger.log("onSetData");
		responseData.data = data;
	}

	onSetMetadata(responseData, metadata) {
		AppResponseLogger.log("onSetMetadata");
		responseData.metadata = metadata;
	}

	onSetCode(response, code) {
		AppResponseLogger.log("onSetCode");
		if (code) {
			response.status(code);
		}
	}

	onSetResponse(response, responseData) {
		AppResponseLogger.log("onSetResponse");
		if (responseData) {
			response.send(responseData.data);
		}
	}

	respond(output, response) {
		AppResponseLogger.log("respond", output);
		const responseData = Object.assign({}, this.defaultData);
		const {
			data = {},
			metadata = {},
			headers = {},
			code = 200
		} = output;
		this.onSetHeaders(response, headers);
		this.onSetExtra(responseData, output);
		this.onSetData(responseData, data);
		this.onSetMetadata(responseData, metadata);
		this.onSetCode(response, code);
		this.onSetResponse(response, responseData);
	}

}

module.exports = AppResponse;