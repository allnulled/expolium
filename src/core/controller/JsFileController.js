const BasicController = require(__dirname + "/BasicController.js");

class JsFileController extends BasicController {

	mountOnRouter(router) {
		const controller = this;
		let importFile = require;
		if(controller.cache === false) {
			importFile = require("import-fresh");
		}
		router.$router[this.method](this.path, (req, res, next) => {
			importFile(this.file).call(this, req, res, next);
		});
	}

}

module.exports = JsFileController;