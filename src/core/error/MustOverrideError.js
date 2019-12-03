const BaseError = require(__dirname + "/BaseError.js");

class MustOverrideError extends BaseError {

	static get name() {
		return "MustOverrideError";
	}

}

module.exports = MustOverrideError;