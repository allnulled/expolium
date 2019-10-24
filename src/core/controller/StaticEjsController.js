const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const ResponseManager = require(process.env.PROJECT_ROOT + "/core/helper/ResponseManager.js");
const BasicController = require(__dirname + "/BasicController.js");

class StaticEjsController extends BasicController {

	mountOnRouter(router) {
		const controller = this;
		const slug = path.posix.join(this.path.replace(/[*]$/g, ""), "*");
		router.$router.get(slug, function(req, res, next) {
			const responser = new ResponseManager(req, res, next);
			const filepath = req.originalUrl;
			const template = filepath + ".ejs";
			const templatePath = path.posix.join(controller.directory, template.replace(/^[/]/g, ""));
			return fs.exists(templatePath, exists => {
				if(exists) {
					return responser.dispatchEjsFile(templatePath, {}, {}, 200);
				} else {
					return next();
				}
			});
		});
	}

}

module.exports = StaticEjsController;