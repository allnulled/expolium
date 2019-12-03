const fs = require("fs");
const path = require("path");

class Models {

	constructor(folder = __dirname + "/model") {
		this.all = {};
		const modelNames = fs.readdirSync(folder);
		modelNames.forEach(modelName => {
			const filepath = path.resolve(folder, modelName);
			if(fs.lstatSync(filepath).isFile()) {
				const model = require(filepath);
				this.all[modelName] = model;
			}
		});
	}

	getAll() {
		return this.all;
	}

	findByTable(table) {
		let out = undefined;
		Object.keys(this.all).forEach(modelName => {
			const model = this.all[modelName];
			if(model.definition.table === table) {
				out = model;
			}
		});
		if(typeof out === "undefined") {
			throw new Error("TableNotFound");
		}
		return out;
	}

}

module.exports = new Models();