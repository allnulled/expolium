const bodyParser = require("body-parser");
const Extension = require(__dirname + "/Extension.js");

class ParseBodyExtension extends Extension {

	static extendApp(app) {
		return new Promise((resolve, reject) => {
			app.$app.use(bodyParser.urlencoded({ extended: true }));
			app.$app.use(bodyParser.json());
			resolve();
		});
	}

}

module.exports = ParseBodyExtension;