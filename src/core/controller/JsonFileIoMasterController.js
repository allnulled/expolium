const fs = require("fs");
const path = require("path");
const ResponseManager = require(process.env.PROJECT_ROOT + "/core/helper/ResponseManager.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");
const BasicController = require(__dirname + "/BasicController.js");

class JsonFileController extends BasicController {

	mountOnRouter(router) {
		router.$router.get(this.path, (req, res, next) => {
			return ResponseManager.create(req, res, next).dispatchFile(path.resolve(this.file, StringUtils.sanitizeFilename(req.query,file)), 200);
		});
		router.$router.post(this.path, (req, res, next) => {
			const contents = req.body.contents;
			const contentsStr = JSON.stringify(contents);
			fs.writeFileSync(this.file, contentsStr, "utf8");
			return ResponseManager.create(req, res, next).dispatchFile(path.resolve(this.file, StringUtils.sanitizeFilename(req.query,file)), 200);
		});
	}

}

module.exports = JsonFileController;