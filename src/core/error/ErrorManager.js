const BasicError = require(__dirname + "/BasicError.js");

class ErrorManager {

	static get classes() {
		class UniversalError extends BasicError {
			constructor(message, info) {
				super();
				this.name = "UniversalError";
				this.message = message;
				this.info = info;
			}
		}
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
		class DependencyNotFoundError extends BasicError {
			constructor(message, info) {
				super();
				this.name = "DependencyNotFoundError";
				this.message = message;
				this.info = info;
			}
		}
		class DependencyNotImportedError extends BasicError {
			constructor(message, info) {
				super();
				this.name = "DependencyNotImportedError";
				this.message = message;
				this.info = info;
			}
		}
		return {
			BasicError,
			RequiredTypeError,
			MustOverrideError,
			MustHaveProperty,
			MustBeInstanceOf,
			FileNotFound,
			AuthenticationError,
			ValidationError,
			UniversalError,
			DependencyNotFoundError,
			DependencyNotImportedError,
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