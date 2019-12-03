const BasicError = require(__dirname + "/BasicError.js");

class RequiredTypeError extends BasicError {
	constructor(message, info) {
		super();
		this.name = "RequiredTypeError";
		this.message = message;
		this.info = info;
	}
}

module.exports = RequiredTypeError;