const HtmlTemplateResponseLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("HtmlTemplateResponse");
const HtmlPageResponse = require(__dirname + "/HtmlPageResponse.js")
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js")

class HtmlTemplateResponse extends HtmlPageResponse {

	onSetHeaders(response, headers) {
		HtmlTemplateResponseLogger.log("onSetHeaders");
		if (headers) {
			response.set(headers);
			response.type("text/plain; charset=utf-8");
		}
	}

}

module.exports = HtmlTemplateResponse;