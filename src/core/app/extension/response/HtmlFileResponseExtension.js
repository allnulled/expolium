const Extension = require(__dirname + "/../Extension.js");

class HtmlFileResponseExtension extends Extension {

	static extendApp(app) {
		return new Promise((resolve, reject) => {
			// @TODO:
			resolve();
		});
	}

}

module.exports = HtmlFileResponseExtension;