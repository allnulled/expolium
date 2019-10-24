const BasicError = require(__dirname + "/BasicError.js");

class ErrorManager {

	static get classes() {
		class RequiredTypeError extends BasicError {
			constructor(message, info) {
				super();
				this.name = "RequiredTypeError";
				this.message = message;
				this.info = info;
			}
		}
		class MustOverrideError extends BasicError {
			constructor(message, info) {
				super();
				this.name = "MustOverrideError";
				this.message = message;
				this.info = info;
			}
		}
		class MustHaveProperty extends BasicError {
			constructor(message, info) {
				super();
				this.name = "MustHaveProperty";
				this.message = message;
				this.info = info;
			}
		}
		class MustBeInstanceOf extends BasicError {
			constructor(message, info) {
				super();
				this.name = "MustBeInstanceOf";
				this.message = message;
				this.info = info;
			}
		}
		class FileNotFound extends BasicError {
			constructor(message, info) {
				super();
				this.name = "FileNotFound";
				this.message = message;
				this.info = info;
			}
		}
		class AuthenticationError extends BasicError {
			constructor(message, info) {
				super();
				this.name = "AuthenticationError";
				this.message = message;
				this.info = info;
			}
		}
		class ValidationError extends BasicError {
			constructor(message, info) {
				super();
				this.name = "ValidationError";
				this.message = message;
				this.info = info;
			}
		}
		return {
			RequiredTypeError,
			MustOverrideError,
			MustHaveProperty,
			MustBeInstanceOf,
			FileNotFound,
			AuthenticationError,
			ValidationError,
		};
	}

	static handle(error) {
		let isHandled = false;
		Object.keys(this.classes).forEach(errorName => {
			const errorClass = this.classes[errorName];
			if(error instanceof errorClass) {
				isHandled = true;
				error.handle();
			}
		});
		if(!isHandled) {
			throw error;
		}
	}

	static throw(error) {
		throw error;
	}

}

module.exports = ErrorManager;