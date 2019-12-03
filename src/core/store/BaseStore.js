const OverridableClass = require(process.env.PROJECT_ROOT + "/core/helper/OverridableClass.js");

class BaseStore extends OverridableClass {

	constructor(options = {}) {
		super(options);
	}

	connect(configuration) {
		throw new ErrorManager.classes.MustOverrideError("BaseStore.connect must be overriden");
	}

	disconnect() {
		throw new ErrorManager.classes.MustOverrideError("BaseStore.disconnect must be overriden");
	}

	listDirectory() {
		throw new ErrorManager.classes.MustOverrideError("BaseStore.listDirectory must be overriden");
	}

	readFile() {
		throw new ErrorManager.classes.MustOverrideError("BaseStore.readFile must be overriden");
	}

	writeFile() {
		throw new ErrorManager.classes.MustOverrideError("BaseStore.writeFile must be overriden");
	}

	appendFile() {
		throw new ErrorManager.classes.MustOverrideError("BaseStore.appendFile must be overriden");
	}

	deleteFile() {
		throw new ErrorManager.classes.MustOverrideError("BaseStore.deleteFile must be overriden");
	}

}

module.exports = BaseStore;