const bodyParser = require("body-parser");
const OverridableClass = require(process.env.PROJECT_ROOT + "/core/helper/OverridableClass.js");
const Extension = require(__dirname + "/Extension.js");

class FrameworkData extends OverridableClass {

	constructor(options = {}) {
		super(options);
	}

}

class FrameworkExtension extends Extension {

	static get FrameworkData() {
		return FrameworkData;
	}

	static extendApp(app) {
		return new Promise((resolve, reject) => {
			app.$app.use((request, response, next) => {
				if ('OPTIONS' === request.method) {
					return response.send(JSON.stringify(200));
				} else {
					return next();
				}
				request.$expolium = new this.FrameworkData({
					session: false,
					user: false,
					permissions: false,
					roles: false,
					communities: false,
				});
				return next();
			});
			resolve();
		});
	}

}

module.exports = FrameworkExtension;