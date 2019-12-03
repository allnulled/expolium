const LoggedMiddleware = require(__dirname + "/LoggedMiddleware.js");
const AuthorizedMiddlewareLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("AuthorizedMiddleware");

class AuthorizedMiddleware extends LoggedMiddleware {

	async usage(request, response, next, parameters = {}) {
		AuthorizedMiddlewareLogger.log("~usage");
		const _ = { request, response, next };
		try {
			this.onGetAuthenticationByBearer(_);
			if(!request.session) {
				this.onGetAuthenticationByCookie(_);
			}
			await this.onAuthenticate(_);
			await this.onAuthorize(_);
			return this.onContinue(_);
		} catch(error) {
			this.onError(error);
		}
	}

	async onAuthorize(request, response, next) {
		// @TODO...
	}

	onAuthenticate(request, response, next) {
		// @TODO...
	}
	
	onContinue(request, response, next) {
		// @TODO...
	}

}

module.exports = AuthorizedMiddleware;