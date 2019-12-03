const fs = require("fs");
const path = require("path");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");
const BasicStore = require(process.env.PROJECT_ROOT + "/core/store/BasicStore.js");

class RawFileStore extends BasicStore {

	static get className() {
		return "RawFileStore";
	}

	read(parameters) {
		if(!("file" in parameters)) {
			// throw new Error("Required file property in parameters");
		}
		return new Promise((resolve, reject) => {
			fs.readFile(path.resolve(this.path, StringUtils.sanitizeFilename(parameters.file || "")), (error, data) => {
				if(error) {
					return reject(error);
				}
				return resolve(data);
			});
		});
	}

	write(parameters) {
		if(!("file" in parameters)) {
			// throw new Error("Required file property in parameters");
		}
		if(!("data" in parameters)) {
			throw new Error("Required data property in parameters");
		}
		return new Promise((resolve, reject) => {
			return fs.writeFile(path.resolve(this.path, StringUtils.sanitizeFilename(parameters.file || ""), parameters.data), (error, data) => {
				if(error) {
					return reject(error);
				}
				return resolve(data);
			});
		}) 
	}

}

module.exports = RawFileStore;