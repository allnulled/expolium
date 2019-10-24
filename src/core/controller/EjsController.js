const ResponseManager = require(process.env.PROJECT_ROOT + "/core/helper/ResponseManager.js");
const BasicController = require(__dirname + "/BasicController.js");

class EjsController extends BasicController {

	getParameters(req, res, next) {
		return req.params;
	}

	mountOnRouter(router) {
		router.$router[this.method](this.path, (req, res, next) => {
			const responser = new ResponseManager(req, res, next);
			return responser.dispatchEjsFile(this.template, this.getParameters(req, res, next), this.options || {}, 200);
		});
	}

}

module.exports = EjsController;