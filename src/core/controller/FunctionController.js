const FunctionControllerLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("FunctionController");
const BaseController = require(__dirname + "/BaseController.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");

class FunctionController extends BaseController {

	constructor(options = {}) {
		super(typeof options === "object" ? options : {});
		FunctionControllerLogger.log("constructor");
		if(typeof options === "object") {
			if(!Array.isArray(options)) {
				Object.assign(this, options);
			}
		} else if(typeof options === "function") {
			Object.assign(this, {controller: options});
		}
		if(typeof this.method !== "string") {
			this.method = "ALL";
		}
		if(typeof this.route !== "string") {
			this.route = "/";
		}
		if(typeof this.middleware !== "object" && typeof this.middleware !== "function") {
			this.middleware = [];
		}
		if(!Array.isArray(this.controller) && typeof this.controller !== "function") {
			this.controller = function(request, response, next) {
				next();
			}
		}
	}

	beMountedOnRouter(router) {
		FunctionControllerLogger.log("beMountedOnRouter");
		router.$router[this.method.toLowerCase()](this.route, this.middleware, this.controller);
	}

}

module.exports = FunctionController;