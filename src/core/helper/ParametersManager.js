const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const moment = require("moment");

class ParametersManager {

	static create(...args) {
		return new this(...args);
	}

	static get DEFAULT_SOURCE() {
		return {
			input: {},
			output: {},
			storage: {}
		}
	}

	static adaptRequestParameters(sourceParameter = null, request, response, next, otherInputs = {}, ...others) {
		let source = sourceParameter;
		if(sourceParameter === null) {
			source = Object.assign({}, this.DEFAULT_SOURCE);
		}
		source.input = Object.assign({}, request.query, request.body, request.params, otherInputs, {
			httpHeaders: request.headers
		});
		if(!("data" in source.output)) {
			source.output.data = null;
		}
		if(!("metadata" in source.output)) {
			source.output.metadata = {
				model: "Session",
				method: "POST",
				operation: "post one",
				action: "login attempt",
				started: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
				finished: undefined,
			};
		}
		if(!("code" in source.output)) {
			source.output.code = 200;
		}
		source.request = request;
		source.response = response;
		source.next = next;
		source.others = others;
		return source;
	}

	constructor(options = {}, ...args) {
		if(typeof options !== "object")
			throw new ErrorManager.classes.RequiredTypeError("object");
		Object.keys(options).forEach(prop => this[prop] = options[prop]);
		if(!("input" in this)) {
			this.input = {};
		}
		if(!("storage" in this)) {
			this.storage = {};
		}
		if(!("output" in this)) {
			this.output = {};
		}
		if(args.length >= 3) {
			this.isResponse = true;
			this.constructor.adaptRequestParameters(this, ...args);
		} else {
			this.isResponse = false;
		}
	}

}

module.exports = ParametersManager;