const express = require("express");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const BasicMiddleware = require(process.env.PROJECT_ROOT + "/core/middleware/BasicMiddleware.js");
const BasicController = require(process.env.PROJECT_ROOT + "/core/controller/BasicController.js");

class BasicRouter {

	constructor(options = {}) {
		this.path = "";
		// this.middleware = [];
		this.$router = new express.Router();
		if(typeof options !== "object")
			throw new ErrorManager.classes.RequiredTypeError("object");
		if(!("app" in options))
			throw new ErrorManager.classes.MustHaveProperty("app");
		Object.keys(options).forEach(prop => this[prop] = options[prop]);
	}

	configure() {
		throw new ErrorManager.classes.MustOverrideError();
	}

	addMiddleware(middleware) {
		if(middleware instanceof BasicMiddleware) {
			this.$router.use(middleware.callback);
			return this;
		} else {
			throw new ErrorManager.classes.RequiredTypeError("BasicMiddleware");
		}
	}

	addController(controller) {
		if(controller instanceof BasicController) {
			controller.mountOnRouter(this);
			return this;
		} else {
			throw new ErrorManager.classes.RequiredTypeError("BasicController");
		}
	}

	addRouter(router) {
		if(router instanceof BasicRouter) {
			this.$router.use(router.path, router.getMiddleware(), (...args) => {
				return router.$router(...args);
			});
			return this;
		} else {
			throw new ErrorManager.classes.RequiredTypeError("BasicRouter");
		}
	}

	getRouter() {
		delete this.$router;
		this.$router = new express.Router();
		this.configure();
		return this.$router;
	}

}

module.exports = BasicRouter;