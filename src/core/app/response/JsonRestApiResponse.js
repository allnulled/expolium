const JsonRestApiResponseLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("JsonRestApiResponse");
const JsonResponse = require(__dirname + "/JsonResponse.js")
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js")
const npmPackage = require(process.env.PROJECT_ROOT + "/../package.json")

class JsonRestApiResponse extends JsonResponse {

	get defaultData() {
		JsonRestApiResponseLogger.log("defaultData");
		return {
			app: {
				id: "My Favourite REST Service",
				version: npmPackage.version
			},
			authors: undefined,
			license: undefined,
			data: null,
			metadata: {}
		}
	}

}

module.exports = JsonRestApiResponse;