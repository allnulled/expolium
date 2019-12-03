module.exports = function() {
	// @TODO:
	const path = require("path");
	const importFresh = require("import-fresh");
	const AuthController = importFresh(process.env.PROJECT_ROOT + "/core/controller/AuthController.js");
	const FunctionController = importFresh(process.env.PROJECT_ROOT + "/core/controller/FunctionController.js");
	const FunctionFileController = importFresh(process.env.PROJECT_ROOT + "/core/controller/FunctionFileController.js");
	const JsonStateController = importFresh(process.env.PROJECT_ROOT + "/core/controller/JsonStateController.js");
	const StaticController = importFresh(process.env.PROJECT_ROOT + "/core/controller/StaticController.js");
	const StaticEjsController = importFresh(process.env.PROJECT_ROOT + "/core/controller/StaticEjsController.js");
	const JsonStateViewController = importFresh(process.env.PROJECT_ROOT + "/core/controller/JsonStateViewController.js");

	const RestController = importFresh(process.env.PROJECT_ROOT + "/core/controller/RestController.js");

	this.mountController(new FunctionController((request, response, next) => {
		response.send("Hello!");
	}));

	this.mountController(new FunctionController({
		route: "/hi",
		controller: (request, response, next) => {
			response.send("Hi!!!");
		}
	}));

	this.mountController(new FunctionFileController({
		route: "/gm-cached",
		controller: path.resolve(process.env.PROJECT_ROOT + "/project/drop/gm-controller.js")
	}));

	this.mountController(new FunctionFileController({
		route: "/gm",
		cache: false,
		controller: path.resolve(process.env.PROJECT_ROOT + "/project/drop/gm-controller.js")
	}));

	this.mountController(new JsonStateController({
		route: "/json/state/1",
		file: path.resolve(process.env.PROJECT_ROOT + "/project/drop/json-state.js")
	}));

	this.mountController(new StaticController({
		route: "/cdn",
		file: path.resolve(process.env.PROJECT_ROOT + "/project/drop/cdn")
	}));

	this.mountController(new StaticController({
		route: "/static",
		file: path.resolve(process.env.PROJECT_ROOT + "/core/public/static")
	}));

	this.mountController(new StaticEjsController({
		route: "/site",
		file: path.resolve(process.env.PROJECT_ROOT + "/project/drop/site")
	}));

	this.mountController(new JsonStateViewController({
		route: "/json/state/2",
		file: path.resolve(process.env.PROJECT_ROOT + "/project/drop/json-state.js")
	}));

	//*

	this.mountController(new AuthController({
		route: "/auth",
		router: this,
	}));
	
	try {
		this.mountController(new RestController({
			route: "/api/v1",
			controllers: [
				//*
				require(process.env.PROJECT_ROOT + "/core/controller/rest/db/CommunityController.js"),
				require(process.env.PROJECT_ROOT + "/core/controller/rest/db/EjemplosController.js"),
				require(process.env.PROJECT_ROOT + "/core/controller/rest/db/MembershipController.js"),
				require(process.env.PROJECT_ROOT + "/core/controller/rest/db/PermissionController.js"),
				require(process.env.PROJECT_ROOT + "/core/controller/rest/db/PermissionPerRoleController.js"),
				require(process.env.PROJECT_ROOT + "/core/controller/rest/db/RoleController.js"),
				require(process.env.PROJECT_ROOT + "/core/controller/rest/db/SessionController.js"),
				require(process.env.PROJECT_ROOT + "/core/controller/rest/db/UserController.js"),
				//*
			]
		}));
	} catch (error) {
		console.log(error);
	}
	//*/
};