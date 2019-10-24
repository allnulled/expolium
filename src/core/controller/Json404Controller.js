const express = require("express");
const urljoin = require("url-join");
const ResponseManager = require(process.env.PROJECT_ROOT + "/core/helper/ResponseManager.js");
const BasicController = require(__dirname + "/BasicController.js");

class Json404Controller extends BasicController {

	mountOnRouter(router) {
		const slug = urljoin(this.path.replace(/\*$/g, ""), "*");
		router.$router.all(slug, (req, res, next) => {
			const responser = new ResponseManager(req, res, next);
			responser.error({type: "URLNotFound", path: req.originalUrl});
		});
	}

}

module.exports = Json404Controller;