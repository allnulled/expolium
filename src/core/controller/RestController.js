const path = require("path");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const ResponseManager = require(process.env.PROJECT_ROOT + "/core/helper/ResponseManager.js");
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
		this.registeredControllers.forEach((controller, index) => {
			// all modification from parent to children, here:
			controller.path = StringUtils.joinUrl(this.path || "/", controller.path || "/");
			this.router.app.logger.info("[*] Controller " + index + ": " + controller.path);
			controller.mountOnRouter.bind(controller)(router);
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