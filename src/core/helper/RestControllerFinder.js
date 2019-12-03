const fs = require("fs");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");

class RestControllerFinder {

	static findController(model, defaultValue = false) {
		const controllerName = StringUtils.capitalize(model) + "Controller";
		const controllerPath = process.env.PROJECT_ROOT + "/core/controller/rest/db/" + controllerName + ".js";
		if(fs.existsSync(controllerPath)) {
			return require(controllerPath);
		}
		return defaultValue;
	}

}

module.exports = RestControllerFinder;