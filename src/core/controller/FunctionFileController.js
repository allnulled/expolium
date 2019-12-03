const FunctionFileControllerLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("FunctionFileController");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const FunctionController = require(__dirname + "/FunctionController.js");

class FunctionFileController extends FunctionController {

	constructor(options = {}) {
		super(options);
		FunctionFileControllerLogger.log("constructor");
		if(typeof options === "object" && typeof options.controller === "string") {
			if(this.cache === false) {
				this.controller = require(options.controller);
			} else {
				const importFresh = require("import-fresh");
				this.controller = importFresh(options.controller);
			}
		}
	}

}

module.exports = FunctionFileController;