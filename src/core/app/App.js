const BaseApp = require(__dirname + "/BaseApp.js");

class App extends BaseApp {

	get mainDatabaseFile() {
		return process.env.PROJECT_ROOT + "/core/database/db.js";
	}
	
}

module.exports = App;