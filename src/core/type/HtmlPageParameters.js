const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const DefaultParameters = require(__dirname + "/DefaultParameters.js");

class HtmlPageParameters extends DefaultParameters {

	static getDefaultParameters() {
		return {
			input: {},
			storage: {},
			output: {
				data: {},
				headers: {},
				code: 200,
				metadata: {
					anonymousTags: [],
					tags: {}
				}
			},
		};
	}

	static adaptParameters(sourceParameters = {}) {
		if(typeof sourceParameters !== "object") {
			throw new ErrorManager.classes.RequiredTypeError("HtmlPageParameters[.constructor].adaptParameters(#1): #1 must be an object");
		}
		if(typeof sourceParameters.output !== "object") {
			throw new ErrorManager.classes.RequiredTypeError("HtmlPageParameters[.constructor].adaptParameters(#1): #1.output must be an object");
		}
		const defaultParameters = this.getDefaultParameters();
		const out = Object.assign({}, defaultParameters, sourceParameters.output);
		["input", "storage", "output"].forEach(prop => {
			if(prop in sourceParameters) {
				out[prop] = Object.assign({}, defaultParameters[prop], out[prop]);
			}
		});
		return this.modifyParameters(out);
	}

};

module.exports = HtmlPageParameters;