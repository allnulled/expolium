const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const ReflectionManager = require(process.env.PROJECT_ROOT + "/core/helper/ReflectionManager.js");
const deepExtend = require("deep-extend");
const moment = require("moment");

class ParametersManager {

	static create(...args) {
		return new this(...args);
	}

	static getDefaultSource(source = {}) {
		let extension = {
			headers: false,
			request: false,
			response: false,
			next: function() {},
		};
		return {
			input: {},
			storage: {},
			output: {
				data: {},
				metadata: {},
				code: 200
			},
			...extension
		}
	}

	static adaptRequestParameters(sourceParameters = {}) {
		const original = Object.assign({}, sourceParameters);
		const source = Object.assign(sourceParameters, this.getDefaultSource(), original);
		const others = [];
		if(original.request) {
			if(original.request.query) {
				others.push(original.request.query);
			}
			if(original.request.body) {
				others.push(original.request.body);
			}
			if(original.request.params) {
				others.push(original.request.params);
			}
		}
		source.input = Object.assign(source.input || {}, ...others, original.input || {});
		source.output = Object.assign(source.output || {}, original.output || {});
		source.metadata = Object.assign(source.metadata || {}, original.metadata || {});
		return source;
	}

	constructor(options = {}) {
		if(typeof options !== "object")
			throw new ErrorManager.classes.RequiredTypeError("object");
		Object.keys(options).forEach(prop => this[prop] = options[prop]);
		this.constructor.adaptRequestParameters(this);
	}

}

module.exports = ParametersManager;