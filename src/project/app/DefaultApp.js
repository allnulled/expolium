const App = require(process.env.PROJECT_ROOT + "/core/app/App.js");
const DefaultRouter = require(process.env.PROJECT_ROOT + "/project/router/DefaultRouter.js");

class DefaultApp extends App {

	static get routerClass() {
		return DefaultRouter;
	}
	
	get settingsFile() {
		return __dirname + "/settings.json";
	}

}

module.exports = DefaultApp;