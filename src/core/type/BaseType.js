const OverridableClass = require(process.env.PROJECT_ROOT + "/core/helper/OverridableClass.js");

class BaseType extends OverridableClass {

	static adaptParameters(sourceParameters = {}) {
		throw new ErrorManager.classes.MustOverrideError("BaseType[.constructor].adaptParameters() must be overriden");
	}

	constructor(options = {}) {
		super();
		if(options instanceof BaseType) {
			Object.assign(this, options);
		} else {
			Object.assign(this, this.constructor.adaptParameters(options));
		}
	}

}

module.exports = BaseType;