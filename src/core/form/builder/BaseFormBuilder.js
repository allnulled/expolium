const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const FormData = require(__dirname + "/FormData.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const RestControllerFinder = require(process.env.PROJECT_ROOT + "/core/helper/RestControllerFinder.js");
const RequestParameters = require(process.env.PROJECT_ROOT + "/core/type/RequestParameters.js");
const PageDependencyUtils = require(process.env.PROJECT_ROOT + "/core/helper/PageDependencyUtils.js");
const BaseFormBuilderLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("BaseFormBuilder");

class BaseFormBuilder {

	static get DEFAULT_FORM_BUILDER_OPTIONS() {
		return {
			typesDirectory: __dirname + "/type"
		};
	}

	static get FormData() {
		return FormData;
	}

	static mixOutputs(outputSource, outputResult) {
		// @TODO: set outputSource.metadata.tags from outputResult.metadata.tags to true
		// @TODO: append outputResult.data to outputSource.data
		if(outputSource.data) {
			//throw new ErrorManager.classes.UniversalError("TODO code...");
		}
		
	}

	getDefaultParameters() {
		return {
			require,
			ErrorManager,
			StringUtils,
			RestControllerFinder,
			formBuilder: this,
			formTypes: this.types,
		};
	}

	constructor(options = {}) {
		Object.assign(this, this.constructor.DEFAULT_FORM_BUILDER_OPTIONS, options);
		if(typeof this.typesDirectory !== "string") {
			throw new ErrorManager.classes.RequiredTypeError("BaseFormBuilder.typesDirectory must be a string");
		}
		this.typesDirectory = path.resolve(this.typesDirectory);
		this.types = fs.readdirSync(this.typesDirectory).reduce((out, file) => {
			if(file.endsWith(".ejs")) {
				const typeName = file.substr(0, file.length-4);
				out[typeName] = {
					type: typeName,
					file: path.resolve(this.typesDirectory + "/" + file)
				};
			}
			return out;
		}, {});
	}

	build(dataTypes = [], initialParameters = {}, settings = {id:"unnamed"}, otherParameters = {}) {
		BaseFormBuilderLogger.log("build");
		const _ = new RequestParameters(initialParameters);
		const formTemplateFile = path.resolve(this.typesDirectory + "/form.ejs");
		const formTemplate = fs.readFileSync(formTemplateFile).toString();
		const allParameters = {
			_,
			initialParameters,
			formTemplateFile,
			dataTypes,
			settings,
			noGrid: false,
			noDescription: false,
			...otherParameters,
			...this.getDefaultParameters()
		};
		allParameters.allParameters = allParameters;
		const str = ejs.render(formTemplate, allParameters);
		_.output.data = str;
		return _.output;
	}

	toPage(...args) {
		BaseFormBuilderLogger.log("toPage");
		const output = this.build(...args);
		return PageDependencyUtils.getHtmlPageFromRequestParametersOutput(output);
	}

}

module.exports = BaseFormBuilder;