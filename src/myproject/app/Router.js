const importFresh = require("import-fresh");
const BasicRouter = require(process.env.PROJECT_ROOT + "/core/app/BasicRouter.js");

class Router extends BasicRouter {

	configure() {
		this.app.logger.info("[DONE] Router.configure");
		importFresh(__dirname + "/Router.configure.js").call(this);
	}

}

module.exports = Router;