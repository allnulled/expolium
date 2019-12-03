const StaticEjsControllerLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("StaticEjsController");
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const BaseController = require(__dirname + "/BaseController.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const RequestParameters = require(process.env.PROJECT_ROOT + "/core/type/RequestParameters.js");

class StaticEjsController extends BaseController {

	beMountedOnRouter(router) {
		router.$router.use([this.route + "/*", this.route], this.middleware || [], (request, response, next) => {
			StaticEjsControllerLogger.log("request.params[0]", request.path);
			if(!request.params[0]) {
				request.params[0] = "index";
			}
			if(request.params[0].indexOf("..") !== -1) {
				return next();
			}
			const filepath = path.resolve(this.file, request.params[0]) + ".ejs";
			StaticEjsControllerLogger.log("filepath", filepath);
			if(fs.existsSync(filepath)) {
				const contentsIn = fs.readFileSync(filepath).toString();
				const _ = new RequestParameters({ request, response, next });
				const contentsOut = ejs.render(contentsIn, {_, request, response, next, filepath}, {});
				return response.send(contentsOut);
			} else {
				return next();
			}
		});
	}

}

module.exports = StaticEjsController;