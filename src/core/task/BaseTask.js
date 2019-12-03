const OverridableClass = require(process.env.PROJECT_ROOT + "/core/helper/OverridableClass.js");

class BaseTask extends OverridableClass {

	constructor(options = {}) {
		super(options);
	}

	getCommitMethods() {
		return ["~onPrepare", "~onCommit", "~onDone"];
	}

	commit(parameters = {}) {
		return ReflectionUtils.gateway(this, this.getCommitMethods(), new TaskParameters(parameters));
	}

	onPrepare() {
		throw new ErrorManager.classes.MustOverrideError("BaseTask.onPrepare must be overriden");
	}

	onCommit() {
		throw new ErrorManager.classes.MustOverrideError("BaseTask.onCommit must be overriden");
	}

	onDone() {
		throw new ErrorManager.classes.MustOverrideError("BaseTask.onDone must be overriden");
	}

}

module.exports = BaseTask;