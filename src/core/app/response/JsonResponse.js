const JsonResponseLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("JsonResponse");
const AppResponse = require(__dirname + "/AppResponse.js")
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js")
const npmPackage = require(process.env.PROJECT_ROOT + "/../package.json")

class JsonResponse extends AppResponse {

	get defaultData() {
		JsonResponseLogger.log("defaultData");
		return {
			data: {},
			metadata: {}
		}
	}

	onSetResponse(response, defaultData) {
		JsonResponseLogger.log("onSetResponse", defaultData);
		if (defaultData) {
			response.json(defaultData);
		}
	}

}

module.exports = JsonResponse;