const path = require("path");
const ejs = require("ejs");
const moment = require("moment");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const ResponseManager = require(process.env.PROJECT_ROOT + "/core/helper/ResponseManager.js");
const ParametersManager = require(process.env.PROJECT_ROOT + "/core/helper/ParametersManager.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");
const ModelController = require(__dirname + "/ModelController.js");
const BasicController = require(__dirname + "/BasicController.js");

class RestController extends BasicController {

	mountOnRouter(router) {
		if(!Array.isArray(this.controllers)) {
			throw new Error("RestController#controllers must be an array");
		}
		// import all model-controllers:
		this.registeredControllers = [];
		this.controllers.forEach(controller => {
			let modelController;
			if(typeof(controller) === "string") {
				try {
					const ModelControllerChild = require(path.resolve(controller));
					const modelControllerChild = new ModelControllerChild({ router: router });
					if(!(modelControllerChild instanceof ModelController)) {
						throw new ErrorManager.classes.MustBeInstanceOf(__dirname + "/ModelController.js");
					}
					this.registeredControllers.push(modelControllerChild);
					modelController = modelControllerChild;
				} catch(error) {
					this.router.app.logger.error("Error importing RestController: " + model);
					throw error;
				}
			} else if(controller instanceof ModelController) {
				this.registeredControllers.push(controller);
				modelController = controller;
			} else {
				modelController = new controller({ router: router });
				if(!(modelController instanceof ModelController)) {
					throw new ErrorManager.classes.MustBeInstanceOf(__dirname + "/ModelController.js");
				}
				this.registeredControllers.push(modelController);
			}
			// modelController.middleware = [].concat(this.middleware).concat(modelController.middleware);
		});
		// mount all model-controllers:
		this.router.app.logger.info("[*] Controllers found:", this.controllers.length);
		const controllers = [];
		this.registeredControllers.forEach((controller, index) => {
			// all modification from parent to children, here:
			controller.path = StringUtils.joinUrl(this.path || "/", controller.path || "/");
			this.router.app.logger.info("[*] Controller " + index + ": " + controller.path);
			controller.mountOnRouter.bind(controller)(router);
			controllers.push(controller);
		});
		const overviewPath = StringUtils.joinUrl(this.path || "/", "@/view");
		router.$router.get(overviewPath, this.getMiddleware(), (request, response, next) => {
			const _ = new ParametersManager({
				controller: this,
				controllerClass: this.constructor,
				request: request,
				response: response,
				next: next,
				input: {
					__method: "GET",
					__operation: "get overview",
				},
				storage: {},
				output: {
					data: undefined, //the model overview
					metadata: {
						model: "(overview)",
						method: "GET",
						operation: "get overview",
						started: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
						finished: undefined,
						tags: {},
					},
					code: 200
				}
			});
			ejs.renderFile(path.resolve(process.env.PROJECT_ROOT + "/core/template/rest/overview.ejs"), {
				controller: this,
				controllers: controllers,
				router: router,
				_: _,
				require: require,
			}).then(result => {
				_.output.data = result;
				return response.sendHtmlSuccess(_.output.data, _.output.metadata, _.output.code);
			}).catch(error => {
				_.output.data = error;
				console.log(error);
				return response.sendHtmlError(_.output.data, _.output.metadata, _.output.code);
			});
		});
	}

	constructor(options = {}) {
		super(options);
		if(typeof options !== "object")
			throw new ErrorManager.classes.RequiredTypeError("object");
		Object.keys(options).forEach(prop => this[prop] = options[prop]);
	}

}

module.exports = RestController;