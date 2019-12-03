const BaseError = require(__dirname + "/BaseError.js");

class PropertyNotFoundError extends BaseError {

	static get name() {
		return "PropertyNotFoundError";
	}

}

module.exports = PropertyNotFoundError;