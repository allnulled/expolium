const Router = require(process.env.PROJECT_ROOT + "/core/router/Router.js");

class DefaultRouter extends Router {

	static get configureFile() {
		return __dirname + "/DefaultRouter.configure.js";
	}

	static get appClass() {
		return require(process.env.PROJECT_ROOT + "/project/app/App.js");
	}
	
}

module.exports = DefaultRouter;