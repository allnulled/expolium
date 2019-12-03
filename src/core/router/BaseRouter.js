const express = require("express");
const importFresh = require("import-fresh");
const BaseRouterLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("BaseRouter");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const OverridableClass = require(process.env.PROJECT_ROOT + "/core/helper/OverridableClass.js");

class BaseRouter extends OverridableClass {

	static get configureFile() {
		throw new ErrorManager.classes.MustOverrideError("BaseRouter[.constructor].configureFile must be overriden");
	}

	constructor(options) {
		super(options);
		if(!(this.app instanceof require(process.env.PROJECT_ROOT + "/core/app/BaseApp.js"))) {
			throw new ErrorManager.classes.RequiredTypeError("BaseRouter.constructor");
		}
		this.$$router = express.Router(); // stores app routes
		this.$router = express.Router(); // stores temporary routes
	}

	mountRouter(router) {
		BaseRouterLogger.log("mountRouter");
		router.beMountedOnRouter(this);
	}

	mountMiddleware(middleware) {
		BaseRouterLogger.log("mountMiddleware");
		middleware.beMountedOnRouter(this);
	}

	mountController(controller) {
		BaseRouterLogger.log("mountController");
		controller.beMountedOnRouter(this);
	}

	configure(_) {
		BaseRouterLogger.log("configure");
		this.$router = express.Router();
		importFresh(this.constructor.configureFile).call(this);
		this.$$router = this.$router;
	}

}

module.exports = BaseRouter;