const OverridableClass = require(process.env.PROJECT_ROOT + "/core/helper/OverridableClass.js");

class BaseController extends OverridableClass {

	constructor(options = {}) {
		super(options);
	}

	beMountedOnRouter(router) {
		throw new ErrorManager.classes.MustOverrideError("BaseController.beMountedOnRouter");
	}

}

module.exports = BaseController;
