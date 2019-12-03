const importFresh = require("import-fresh");
const path = require("path");
const BasicController = require(process.env.PROJECT_ROOT + "/core/controller/BasicController.js");
const JsonFileIoController = require(process.env.PROJECT_ROOT + "/core/controller/JsonFileIoController.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");

class BackOfficeController extends BasicController {

	mountOnRouter(router) {
		router.addController(new JsonFileIoController({
			router: this,
			path: "/json",
			file: process.env.PROJECT_ROOT + "/../data/filesystem/core/ui.layout/settings.json"
		}));
	}

}

module.exports = BackOfficeController;