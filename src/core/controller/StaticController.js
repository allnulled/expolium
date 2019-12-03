const express = require("express");
const path = require("path");
const BasicController = require(__dirname + "/BasicController.js");

class StaticController extends BasicController {

	mountOnRouter(router) {
		const slug = path.posix.join(this.path.replace(/\*$/g, ""), "");
		console.log("Log slug:", slug, this.directory);
		router.$router.use(slug, express.static(path.resolve(this.directory)));
	}

}

module.exports = StaticController;