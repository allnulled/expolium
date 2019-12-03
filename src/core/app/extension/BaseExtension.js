const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const OverridableClass = require(process.env.PROJECT_ROOT + "/core/helper/OverridableClass.js");

class BaseExtension extends OverridableClass {

	static extendApp(app) {
		throw new ErrorManager.classes.MustOverrideError("BaseExtension[.constructor].extendApp()");
	}

}

module.exports = BaseExtension;