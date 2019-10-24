const express = require("express");
const path = require("path");
const ResponseManager = require(process.env.PROJECT_ROOT + "/core/helper/ResponseManager.js");
const BasicController = require(__dirname + "/BasicController.js");

class Html404Controller extends BasicController {

	mountOnRouter(router) {
		const slug = path.posix.join(this.path.replace(/\*$/g, ""), "*");
		router.$router.all(slug, (req, res, next) => {
			const responser = new ResponseManager(req, res, next);
			return responser.dispatchFile(process.env.PROJECT_ROOT + "/core/template/404.ejs", 200);
		});
	}

}

module.exports = Html404Controller;