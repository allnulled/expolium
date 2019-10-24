const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const ResponseManager = require(process.env.PROJECT_ROOT + "/core/helper/ResponseManager.js");
const BasicController = require(__dirname + "/BasicController.js");

class JsonFileController extends BasicController {

	mountOnRouter(router) {
		const controller = this;
		// console.log("Added on:", this.method, this.path);
		router.$router[this.method](this.path, (req, res, next) => {
			return ResponseManager.create(req, res, next).dispatchFile(this.file, 200);
		});
	}

}

module.exports = JsonFileController;