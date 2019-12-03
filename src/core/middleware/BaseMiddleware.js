const OverridableClass = require(process.env.PROJECT_ROOT + "/core/helper/OverridableClass.js");
const BaseMiddlewareLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("BaseMiddleware");

class BaseMiddleware extends OverridableClass {

	constructor(options = {}) {
		super(options);
		this.validateInitialization(options);
	}

	validateInitialization(options = {}) {
		return;
	}

	usage(request, response, next) {
		BaseMiddlewareLogger.log("usage");
		return next();
	}

	onError(error, _) {
		BaseMiddlewareLogger.log("onError", error);
		return new JsonRestApiResponse().respond({error}, _.response);
	}

}

module.exports = BaseMiddleware;