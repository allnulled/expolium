const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const BasicRouter = require(process.env.PROJECT_ROOT + "/core/app/BasicRouter.js");
const BasicMiddleware = require(process.env.PROJECT_ROOT + "/core/middleware/BasicMiddleware.js");

class BasicController {

	constructor(options = {}) {
		this.method = "all";
		this.path = "";
		this.middleware = [];
		this.controller = [];
		if(typeof options !== "object")
			throw new ErrorManager.classes.RequiredTypeError("object");
		if(!("router" in options))
			throw new ErrorManager.classes.MustHaveProperty("router");
		Object.keys(options).forEach(prop => this[prop] = options[prop]);
	}

	mountOnRouter(router) {
		if(router instanceof require(process.env.PROJECT_ROOT + "/core/app/BasicRouter.js")) {
			router.$router[this.method.toLowerCase()](this.path, ...this.getMiddleware(), ...this.getController());
			return this;
		} else {
			throw new ErrorManager.classes.RequiredTypeError("BasicRouter");
		}
	}

	getMiddleware() {
		return [].concat(this.middleware).map(middleware => {
			if(middleware instanceof require(process.env.PROJECT_ROOT + "/core/middleware/BasicMiddleware.js")) {
				return middleware.middleware;
			} else if(typeof middleware === "function") {
				return middleware;
			} else if(Array.isArray(middleware)) {
				return middleware;
			} else {
				throw new ErrorManager.classes.RequiredTypeError("BasicMiddleware");
			}
		});
	}

	getController() {
		return [].concat(this.controller).map(controller => {
			if(controller instanceof BasicController) {
				return [].concat(controller.middleware).concat(controller.controller);
			} else if(typeof controller === "function") {
				return controller;
			} else if(Array.isArray(controller)) {
				return controller;
			} else {
				throw new ErrorManager.classes.RequiredTypeError("BasicController");
			}
		});
	}

	setMethod(method) {
		this.method = method;
		return this;
	}

	setPath(path) {
		this.path = path;
		return this;
	}

	setMiddleware(middleware) {
		this.middleware = middleware;
		return this;
	}

	setController(controller) {
		this.controller = controller;
		return this;
	}

}

module.exports = BasicController;