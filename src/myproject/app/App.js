const DBManager = require(process.env.PROJECT_ROOT + "/core/helper/DBManager.js");
const BasicApp = require(process.env.PROJECT_ROOT + "/core/app/App.js");
const Router = require(__dirname + "/Router.js");

class App extends BasicApp {

	static get name() {
		return "MyProject REST API";
	}

	static get routerClass() {
		return Router;
	}

	async initDB() {
		this.db = DBManager.createFromEnvPrefix("DB_");
		// this.db = DBManager.createFromEnvPrefix("DB2_");
		// this.db = DBManager.createFromEnvPrefix("DB3_");
	}

}

module.exports = App;