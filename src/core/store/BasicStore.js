const fs = require("fs");

class BasicStore {

	static get className() {
		return "BasicStore";
	}

	read(parameters) {
		throw new Error("Must override " + this.constructor.className + "#read method");
	}

	write(parameters) {
		throw new Error("Must override " + this.constructor.className + "#write method");
	}

	readSync(parameters) {
		throw new Error("Must override " + this.constructor.className + "#readSync method");
	}

	writeSync(parameters) {
		throw new Error("Must override " + this.constructor.className + "#writeSync method");
	}

}

module.exports = BasicStore;