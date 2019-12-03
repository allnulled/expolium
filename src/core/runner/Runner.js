const BaseRunner = require(__dirname + "/BaseRunner.js");
const App = require(process.env.PROJECT_ROOT + "/core/app/App.js");

class Runner extends BaseRunner {
	
	static get appClass() {
		return App;
	}

}

module.exports = Runner;
