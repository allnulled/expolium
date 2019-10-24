const importFresh = require("import-fresh");
const listEndpoints = require("express-list-endpoints");
require("console.table");

module.exports = function() {
	try {
		const LoggedMiddleware = importFresh(process.env.PROJECT_ROOT + "/core.auth/middleware/LoggedMiddleware.js");
		const AuthorizedMiddleware = importFresh(process.env.PROJECT_ROOT + "/core.auth/middleware/AuthorizedMiddleware.js");

		const LoginController = importFresh(process.env.PROJECT_ROOT + "/core.auth/controller/LoginController.js");
		const LogoutController = importFresh(process.env.PROJECT_ROOT + "/core.auth/controller/LogoutController.js");
		const RecoverController = importFresh(process.env.PROJECT_ROOT + "/core.auth/controller/RecoverController.js");
		const RegisterController = importFresh(process.env.PROJECT_ROOT + "/core.auth/controller/RegisterController.js");
		const UnregisterController = importFresh(process.env.PROJECT_ROOT + "/core.auth/controller/UnregisterController.js");
		const BackOfficeController = importFresh(process.env.PROJECT_ROOT + "/core/controller/BackOfficeController.js");
		const RestController = importFresh(process.env.PROJECT_ROOT + "/core/controller/RestController.js");
		const StaticController = importFresh(process.env.PROJECT_ROOT + "/core/controller/StaticController.js");
		const StaticEjsController = importFresh(process.env.PROJECT_ROOT + "/core/controller/StaticEjsController.js");
		const EjsController = importFresh(process.env.PROJECT_ROOT + "/core/controller/EjsController.js");
		const Json404Controller = importFresh(process.env.PROJECT_ROOT + "/core/controller/Json404Controller.js");
		const Html404Controller = importFresh(process.env.PROJECT_ROOT + "/core/controller/Html404Controller.js");
		const JsonFileController = importFresh(process.env.PROJECT_ROOT + "/core/controller/JsonFileController.js");
		const JsFileController = importFresh(process.env.PROJECT_ROOT + "/core/controller/JsFileController.js");

		this.addController(new RegisterController({
			router: this,
			path: ["/auth/v1/register"],
		}));

		this.addController(new UnregisterController({
			router: this,
			path: ["/auth/v1/unregister"],
		}));

		this.addController(new LoginController({
			router: this,
			path: ["/auth/v1/login"],
		}));

		this.addController(new LogoutController({
			router: this,
			path: ["/auth/v1/logout"],
		}));

		this.addController(new RecoverController({
			router: this,
			path: ["/auth/v1/recover"],
		}));

		this.addMiddleware(new LoggedMiddleware());

		this.addController(new EjsController({
			router: this,
			path: ["/", "/welcome", "/homeeee"],
			template: process.env.PROJECT_ROOT + "/custom/template/ok.ejs"
		}));
		this.addController(new JsonFileController({
			router: this,
			path: "/json",
			file: process.env.PROJECT_ROOT + "/../package.json"
		}));
		this.addController(new JsFileController({
			router: this,
			path: "/sql",
			cache: false,
			file: process.env.PROJECT_ROOT + "/custom/controller/SqlQuery.js"
		}))
		this.addController(new RestController({
			router: this,
			path: "/api/v1",
			controllers: [
				importFresh(process.env.PROJECT_ROOT + "/core.rest/db/controller/CommunityController.js"),
				importFresh(process.env.PROJECT_ROOT + "/core.rest/db/controller/MembershipController.js"),
				importFresh(process.env.PROJECT_ROOT + "/core.rest/db/controller/PermissionController.js"),
				importFresh(process.env.PROJECT_ROOT + "/core.rest/db/controller/PermissionPerRoleController.js"),
				importFresh(process.env.PROJECT_ROOT + "/core.rest/db/controller/RoleController.js"),
				importFresh(process.env.PROJECT_ROOT + "/core.rest/db/controller/UserController.js"),
			]
		}))
		this.addController(new Json404Controller({
			router: this,
			path: "/api/v1"
		}));
		this.addController(new BackOfficeController({
			router: this,
			path: "/backoffice"
		}));
		this.addController(new StaticEjsController({
			router: this,
			path: "/",
			directory: process.env.PROJECT_ROOT + "/custom/public/rendered"
		}));
		this.addController(new StaticController({
			router: this,
			path: "/",
			directory: process.env.PROJECT_ROOT + "/custom/public/static"
		}));
		this.addController(new Html404Controller({
			router: this,
			path: "/"
		}));

		// console.log(this.$router.stack.map(i => i.regexp.source));

		const endpoints = listEndpoints(this.$router);
		this.app.logger.info(endpoints);
		console.table(endpoints);
	} catch(error) {
		console.log("Error mounting router", error);
	}

};