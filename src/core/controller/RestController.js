const fs = require("fs");
const express = require("express");
const ejs = require("ejs");
const BaseController = require(__dirname + "/BaseController.js");
const JsonRestApiResponse = require(process.env.PROJECT_ROOT + "/core/app/response/JsonRestApiResponse.js");
const RestControllerLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("RestController");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const RequestParameters = require(process.env.PROJECT_ROOT + "/core/type/RequestParameters.js");
const RestModelController = require(__dirname + "/RestModelController.js");

class RestController extends BaseController {

	static get RestModelController() {
		return RestModelController;
	}

	constructor(options = {}) {
		super(options);
		if(typeof this.route === "undefined") {
			this.route = "/";
		}
		if(typeof this.middleware === "undefined") {
			this.middleware = [];
		}
		if(typeof this.controllers !== "object" || !Array.isArray(this.controllers)) {
			throw new ErrorManager.classes.RequiredTypeError("RestController.controllers must be an array");
		}
	}

	onFallbackRequest(request, response, next) {
		return new JsonRestApiResponse().respond({ data: {error: "This URL does not correspond to a valid endpoint of this REST API."}, code: 404, metadata: {}}, response);
	}
	
	beMountedOnRouter(router) {
		RestControllerLogger.log("beMountedOnRouter");
		const restRouter = express.Router();
		this.controllers.forEach((controller, controllerIndex) => {
			let controllerInstance = typeof controller === "object" ? controller : undefined;
			if(typeof controllerInstance === "undefined") {
				controllerInstance = new controller({ router, restController: this });
			}
			if(controllerInstance instanceof this.constructor.RestModelController) {
				controllerInstance.beMountedOnRouter(router, restRouter);
			} else {
				RestControllerLogger.log("error with:", controllerInstance);
				throw new ErrorManager.classes.RequiredTypeError("RestController.controllers must be an array of RestModelController instances (" + controllerIndex + ")");
			}
			this.controllers[controllerIndex] = controllerInstance;
		});
		// 1. JSON OVERVIEW:
		restRouter.get("/", (request, response, next) => {
			const routes = {};
			this.controllers.forEach(controller => {
				const route = StringUtils.joinUrl("/" + controller.constructor.path);
				const publicDefinition = {route, ...controller.constructor.model.definition.getPublicDefinition()};
				routes[publicDefinition.table] = publicDefinition;
			});
			return new JsonRestApiResponse().respond({ data: routes, code: 200, metadata: {baseUrl: this.route}}, response);
		});
		// 2. ROUTER:
		router.$router.use(this.route, restRouter);
		// 3. UI OVERVIEW:
		restRouter.get(["/@/overview", "/@/view"], (request, response, next) => {
			const _ = new RequestParameters({ request, response, next });
			ejs.renderFile(process.env.PROJECT_ROOT + "/core/template/rest/overview.ejs", {_,require}, (error, text) => {
				if(error) {
					RestControllerLogger.log(error);
					return response.send(error);
				}
				return response.send(text);
			});
		});
		// 4. FALLBACK:
		restRouter.all("*", this.onFallbackRequest);
		RestControllerLogger.log("mounted with " + Object.keys(this.controllers).length + " models on " + this.route);
	}

}

module.exports = RestController;