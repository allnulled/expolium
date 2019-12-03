const BaseError = require(__dirname + "/BaseError.js");

class TypeNotSupportedError extends BaseError {

	static get name() {
		return "TypeNotSupportedError";
	}

}

module.exports = TypeNotSupportedError;