const express = require("express");
const BaseController = require(__dirname + "/BaseController.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");

class StaticController extends BaseController {

	beMountedOnRouter(router) {
		router.$router.use(this.route, this.middleware || [], express.static(this.file));
	}

}

module.exports = StaticController;