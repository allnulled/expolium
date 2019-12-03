const Extension = require(__dirname + "/../Extension.js");

class EjsResponseExtension extends Extension {

	static extendApp(app) {
		return new Promise((resolve, reject) => {
			// @TODO:
			resolve();
		});
	}

}

module.exports = EjsResponseExtension;