const BaseError = require(__dirname + "/BaseError.js");

class RequiredTypeError extends BaseError {

	static get name() {
		return "RequiredTypeError";
	}

}

module.exports = RequiredTypeError;