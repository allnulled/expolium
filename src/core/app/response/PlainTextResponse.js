const PlainTextResponseLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("PlainTextResponse");
const AppResponse = require(__dirname + "/AppResponse.js")
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js")

class PlainTextResponse extends AppResponse {

	onSetHeaders(response, headers) {
		PlainTextResponseLogger.log("onSetHeaders");
		if (headers) {
			response.set(headers);
			response.type("text/plain; charset=utf-8");
		}
	}

}

module.exports = PlainTextResponse;