const HtmlPageResponseLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("HtmlPageResponse");
const AppResponse = require(__dirname + "/AppResponse.js")
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js")

class HtmlPageResponse extends AppResponse {

	onSetHeaders(response, headers) {
		HtmlPageResponseLogger.log("onSetHeaders");
		if (headers) {
			response.set(headers);
			response.type("text/html; charset=utf-8");
		}
	}

}

module.exports = HtmlPageResponse;