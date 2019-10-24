const fs = require("fs");
const path = require("path");
const importFresh = require("import-fresh");

class ModelManager {

	constructor() {

	}

	get paths() {
		return this.paths;
	}

	get models() {

	}

	getModels() {

	}

	refreshModels() {

	}

	static import(basename, ...args) {
		return require(path.resolve(process.env.ROOT_PROJECT, basename.replace(/^\//g,""), ...args));
	}

	static importFresh(basename) {
		return importFresh(path.resolve(process.env.ROOT_PROJECT, basename.replace(/^\//g,""), ...args));
	}

}

module.exports = ImportManager;