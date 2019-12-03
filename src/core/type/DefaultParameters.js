const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const BaseType = require(__dirname + "/BaseType.js");

class DefaultParameters extends BaseType {

	static get defaultParameters() {
		return {
			input: {},
			storage: {},
			output: {}
		};
	}


	static get specialParameters() {
		return ["input", "storage", "output"];
	}

	static adaptParameters(sourceParameters = {}) {
		if(typeof sourceParameters !== "object") {
			throw new ErrorManager.classes.RequiredTypeError("RequestParameters[.constructor].adaptParameters(Object:#1)");
		}
		const out = Object.assign({}, this.defaultParameters, sourceParameters);
		this.specialParameters.forEach(prop => {
			if(prop in sourceParameters) {
				out[prop] = Object.assign({}, sourceParameters[prop], out[prop]);
			}
		});
		return this.modifyParameters(out);
	}

	static modifyParameters(adaptedParameters) {
		return adaptedParameters;
	}

};

module.exports = DefaultParameters;