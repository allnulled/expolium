const importFresh = require("import-fresh");
const path = require("path");

class ImportManager {

	static import(basename) {
		return require(path.resolve(process.env.ROOT_PROJECT, basename.replace(/^\//g,"")));
	}

	static importFresh(basename) {
		return importFresh(path.resolve(process.env.ROOT_PROJECT, basename.replace(/^\//g,"")));
	}

}

module.exports = ImportManager;