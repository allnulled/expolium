const BasicController = require(__dirname + "/BasicController.js");
const ParametersManager = require(process.env.PROJECT_ROOT + "/core/helper/ParametersManager.js");

class EjsPageController extends BasicController {

	getParameters(req, res, next) {
		return Object.assign({}, req.query, req.body, req.params);
	}

	mountOnRouter(router) {
		router.$router[this.method](this.path, (request, response, next) => {
			const _ = new ParametersManager({
				controller: this,
				controllerClass: this.constructor,
				request: request,
				response: response,
				next: next,
				output: {
					data: {},
					metadata: {
						tags: {}
					}
				}
			});
			return response.sendHtmlEjsFileSuccess(this.template, {_}, _.output.metadata, _.output.code);

		});
	}

}

module.exports = EjsPageController;