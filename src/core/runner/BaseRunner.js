const BaseRunnerLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("BaseRunner");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const ReflectionUtils = require(process.env.PROJECT_ROOT + "/core/helper/ReflectionUtils.js");
const OverridableClass = require(process.env.PROJECT_ROOT + "/core/helper/OverridableClass.js");
const BaseApp = require(process.env.PROJECT_ROOT + "/core/app/BaseApp.js");

class BaseRunner extends OverridableClass {
	
	static get appClass() {
		throw new ErrorManager.classes.MustOverrideError("BaseRunner[.constructor].appClass");
	}
	
	constructor(options = {}, callback = undefined) {
		super(options, callback);
		BaseRunnerLogger.log("constructor");
		if(!this.app) {
			this.app = new this.constructor.appClass({ runner: this });
		}
		if(!this.app instanceof BaseApp) {
			throw new ErrorManager.classes.RequiredTypeError("BaseRunner.app must be a BaseApp instance");
		}
	}
	
	load(...args) {
		BaseRunnerLogger.log("load");
		return this.app.load(...args);
	}

	start(...args) {
		BaseRunnerLogger.log("start");
		return this.app.start(...args);
	}

}

module.exports = BaseRunner;
