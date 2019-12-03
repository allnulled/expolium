const ejs = require("ejs");
const BasicController = require(process.env.PROJECT_ROOT + "/core/controller/BasicController.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const ParametersManager = require(process.env.PROJECT_ROOT + "/core/helper/ParametersManager.js");

class LoginController extends BasicController {

	constructor(options = {}) {
		super(options);
		this.method = "post";
		this.controller = [this.loginCallback.bind(this)];
	}

	loginCallback(request, response, next) {
		return this.constructor.login(new ParametersManager({
			controller: this,
			controllerClass: this.constructor,
			request: request,
			response: response,
			next: next,
		}));
	}

	static login(_) {
		return new Promise((resolve, reject) => {
			return ejs.renderFile(process.env.PROJECT_ROOT + "/core/template/auth/login.ejs", {
				controller: _.controller,
				controllerClass: this,
				request: _.request,
				response: _.response,
				next: _.next,
			}, {}).then(result => {
				_.output.data = result;
				if(_.response) {
					_.exit = true;
					_.response.sendHtmlSuccess(_.output.data, _.output.metadata, _.output.code);
					return resolve(_.output);
				}
			}).catch(error => {
				_.output.error = error;
				if(_.response) {
					_.exit = true;
					_.response.sendHtmlError(error, {}, 500);
					return reject(error);
				}
			});
		});
	}

}

module.exports = LoginController;