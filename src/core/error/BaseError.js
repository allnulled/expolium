class BaseError extends Error {

	static get name() {
		throw new Error("Must override BaseError[.constructor].name property");
	}

	static get handle() {
		return function(error) {
			console.log("Error thrown!", error);
		};
	}

	constructor(message = "", details = {}, handle = undefined) {
		super();
		this.name = this.constructor.name;
		this.message = message;
		this.details = details;
		this.handle = handle || this.constructor.handle;
	}

}

module.exports = BaseError;