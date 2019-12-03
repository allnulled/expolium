const cookieParser = require("cookie-parser");
const Extension = require(__dirname + "/Extension.js");

class ParseBodyExtension extends Extension {

	static extendApp(app) {
		return new Promise((resolve, reject) => {
			app.$app.use(cookieParser());
			resolve();
		});
	}

}

module.exports = ParseBodyExtension;