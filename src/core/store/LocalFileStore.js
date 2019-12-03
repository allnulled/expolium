const BaseStore = require(__dirname + "/BaseStore.js");

class LocalFileStore extends BaseStore {

	constructor(options = {}) {
		super(options);
	}
	
	listen(event, callback) {
		// @TODO
	}
	
	emit(event, parameters) {
		// @TODO
	}

	connect(configuration) {
		return new Promise((resolve, reject) => {
			// @TODO
		});
	}

	disconnect() {
		return new Promise((resolve, reject) => {
			// @TODO
		});
	}

	listDirectory() {
		return new Promise((resolve, reject) => {
			// @TODO
		});
	}

	readFile() {
		return new Promise((resolve, reject) => {
			// @TODO
		});
	}

	writeFile() {
		return new Promise((resolve, reject) => {
			// @TODO
		});
	}

	appendFile() {
		return new Promise((resolve, reject) => {
			// @TODO
		});
	}

	deleteFile() {
		return new Promise((resolve, reject) => {
			// @TODO
		});
	}

}

module.exports = LocalFileStore;