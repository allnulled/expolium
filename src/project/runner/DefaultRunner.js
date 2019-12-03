const Runner = require(process.env.PROJECT_ROOT + "/core/runner/Runner.js");
const DefaultApp = require(process.env.PROJECT_ROOT + "/project/app/DefaultApp.js");

class DefaultRunner extends Runner {
	
	static get appClass() {
		return DefaultApp;
	}

}

module.exports = DefaultRunner;