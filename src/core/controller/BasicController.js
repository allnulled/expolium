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
			router.$router[this.method.toLowerCase()](this.path, this.middleware, this.controller, this.handle, this.fail);
			return this;
		} else {
			throw new ErrorManager.classes.RequiredTypeError("BasicRouter");
		}
	}

	addMiddleware(middleware) {
		if(middleware instanceof BasicMiddleware) {
			this.middleware = this.middleware.concat(middleware);
			return this;
		} else {
			throw new ErrorManager.classes.RequiredTypeError("BasicMiddleware");
		}
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

	handle(request, response, next) {
		// @TODO: handle the request.
		response.code(200).json({status: "ok", message: "hoooray!"});
	}

	fail(request, response, next) {
		response.code(500).json({status: "failed"});
	}

}

module.exports = BasicController;