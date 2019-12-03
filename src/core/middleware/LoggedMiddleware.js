const BaseMiddleware = require(__dirname + "/BaseMiddleware.js");
const LoggedMiddlewareLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("LoggedMiddleware");

class LoggedMiddleware extends BaseMiddleware {

	async usage(request, response, next) {
		LoggedMiddlewareLogger.log("~usage");
		const _ = { request, response, next };
		try {
			this.onGetAuthenticationByHeader(_);
			this.onGetAuthenticationByParameters(_);
			await this.onAuthenticate(_);
			return this.onContinue(_);
		} catch(error) {
			this.onError(error);
		}
	}

	onGetAuthenticationByHeader(_) {
		LoggedMiddlewareLogger.log("onGetAuthenticationByHeader");
		_.request.$expolium.authenticationRequestToken = undefined;
	}

	onGetAuthenticationByParameters(_) {
		LoggedMiddlewareLogger.log("onGetAuthenticationByParameters");
		_.request.$expolium.authenticationRequestToken = undefined;
	}

	onAuthenticate(_) {
		LoggedMiddlewareLogger.log("onAuthenticate");
		const { request, response, next } = _;
		const token = request.$expolium.authenticationRequestToken;
	}

	onContinue(_) {
		return _.next();
	}

}

module.exports = LoggedMiddleware;