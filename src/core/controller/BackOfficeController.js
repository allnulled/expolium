const importFresh = require("import-fresh");
const path = require("path");
const BasicController = require(__dirname + "/BasicController.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");

class BackOfficeController extends BasicController {

	mountOnRouter(router) {
		const loginController = importFresh(process.env.PROJECT_ROOT + "/core/controller/backoffice/login.js");
		const welcomeController = importFresh(process.env.PROJECT_ROOT + "/core/controller/backoffice/welcome.js");
		router.$router.get(path.posix.join(this.path, ""), welcomeController);
		router.$router.get(path.posix.join(this.path, "welcome"), welcomeController);
		router.$router.get(path.posix.join(this.path, "login"), loginController);
	}

}

module.exports = BackOfficeController;