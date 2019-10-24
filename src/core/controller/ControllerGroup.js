const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const ResponseManager = require(process.env.PROJECT_ROOT + "/core/helper/ResponseManager.js");
const BasicController = require(__dirname + "/BasicController.js");
const RestController = require(__dirname + "/RestController.js");

class ControllerGroup extends BasicController {

	mountOnRouter(router) {
		this.controllers.forEach(controller => {
			if(!(controller instanceof BasicController)) {
				throw new ErrorManager.classes.RequiredTypeError("object:src/controller/BasicController.js");
			}
			controller.mountOnRouter(router);
		});
	}

	add(controller) {
		if(!this.controllers) {
			this.controllers = [];
		}
		this.controllers.push(controller);
	}

	getControllers() {
		if(!this.controllers) {
			this.controllers = [];
		}
		return this.controllers;
	}

}

module.exports = ControllerGroup;