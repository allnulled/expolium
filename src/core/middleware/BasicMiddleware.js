const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const BasicRouter = require(process.env.PROJECT_ROOT + "/core/app/BasicRouter.js");
const BasicController = require(process.env.PROJECT_ROOT + "/core/controller/BasicController.js");

class BasicMiddleware {

	static NOOP(request, response, next) {
		return next();
	}

	constructor(options = {}) {
		this.callback = [this.constructor.NOOP];
		if(typeof options !== "object")
			throw new ErrorManager.classes.RequiredTypeError("object");
		Object.keys(options).forEach(prop => this[prop] = options[prop]);
		this.callback = [].concat(this.callback);
	}

	mountOnRouter(router) {
		if(router instanceof BasicRouter) {
			router.$router.use(this.callback);
			return this;
		} else {
			throw new ErrorManager.classes.RequiredTypeError("BasicRouter");
		}
	}

	mountOnController(controller) {
		if(controller instanceof BasicController) {
			controller.middleware = [].concat(controller.middleware).concat(this.callback);
			return this;
		} else {
			throw new ErrorManager.classes.RequiredTypeError("BasicController");
		}
	}

	mountOnMiddleware(middleware) {
		if(middleware instanceof BasicMiddleware) {
			middleware.callback = [].concat(middleware.callback).concat(this.callback);
			return this;
		} else {
			throw new ErrorManager.classes.RequiredTypeError("BasicMiddleware");
		}
	}

	setCallback(callback) {
		this.callback = [callback];
		return this;
	}

	addCallback(callback) {
		this.callback.push(callback);
		return this;
	}

	addMiddleware(middleware) {
		if(middleware instanceof BasicMiddleware) {
			this.callback = this.callback.concat(middleware.callback);
			return this;
		} else {
			throw new ErrorManager.classes.RequiredTypeError("BasicMiddleware");
		}
	}

}

module.exports = BasicMiddleware;