const fs = require("fs");
const JsonStateControllerLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("JsonStateController");
const JsonResponse = require(process.env.PROJECT_ROOT + "/core/app/response/JsonResponse.js");
const BaseController = require(__dirname + "/BaseController.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");

class JsonStateController extends BaseController {

	static dispatchGetDataFactory(router, controller) {
		JsonStateControllerLogger.log("dispatchGetDataFactory");
		return (request, response, next) => {
			try {
				const data = JSON.parse(fs.readFileSync(controller.file).toString());
				return new JsonResponse().respond({ data: data, code: 200, metadata: {}}, response);
			} catch(error) {
				return new JsonResponse().respond({ data: error, code: 500, metadata: {}}, response);
			}
		};
	}

	static dispatchPostDataFactory(router, controller) {
		JsonStateControllerLogger.log("dispatchPostDataFactory");
		return (request, response, next) => {
			try {
				fs.writeFileSync(controller.file, JSON.stringify(request.body), "utf8");
				return new JsonResponse().respond({ data: request.body, code: 200, metadata: {}}, response);
			} catch(error) {
				JsonStateControllerLogger.log(error);
				return new JsonResponse().respond({ data: error, code: 500, metadata: {}}, response);
			}
		};
	}
	
	static addGetRequestsControllerToRouter(router, controller) {
		router.$router.get(controller.route, controller.middleware || [], controller.constructor.dispatchGetDataFactory(router, controller));
	}

	static addPostRequestsControllerToRouter(router, controller) {
		router.$router.post(controller.route, controller.middleware || [], controller.constructor.dispatchPostDataFactory(router, controller));
	}

	beMountedOnRouter(router) {
		this.constructor.addGetRequestsControllerToRouter(router, this);
		this.constructor.addPostRequestsControllerToRouter(router, this);
	}

}

module.exports = JsonStateController;