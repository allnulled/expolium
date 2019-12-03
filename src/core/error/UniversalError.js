const BaseError = require(__dirname + "/BaseError.js");

class UniversalError extends BaseError {

	static get name() {
		return "UniversalError";
	}

}

module.exports = UniversalError;