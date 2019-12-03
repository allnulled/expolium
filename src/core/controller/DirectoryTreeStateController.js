const BaseController = require(__dirname + "/BaseController.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/helper/ErrorManager.js");

class DirectoryTreeStateController extends BaseController {

	beMountedOnRouter(router) {
		throw new ErrorManager.classes.MustOverrideError("BaseController.beMountedOnRouter");
	}

}

module.exports = DirectoryTreeStateController;