const BaseController = require(__dirname + "/BaseController.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const JsonResponse = require(process.env.PROJECT_ROOT + "/core/app/response/JsonResponse.js");
const JsonStateController = require(process.env.PROJECT_ROOT + "/core/controller/JsonStateController.js");

class JsonStateViewController extends JsonStateController {

	static addPostRequestsControllerToRouter(router, controller) {
		// @HERE better empty.
	}

}

module.exports = JsonStateViewController;