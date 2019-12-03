const OverridableClass = require(process.env.PROJECT_ROOT + "/core/helper/OverridableClass.js");

class BaseFormData extends OverridableClass {

	constructor(data, metadata = []) {
		super(options);
		if(typeof this.data !== "string") {
			throw new ErrorManager.classes.MustOverrideError("BaseFormData.data must be a string");
		}
		if(!Array.isArray(this.metadata)) {
			throw new ErrorManager.classes.MustOverrideError("BaseFormData.metadata must be an array");
		}
	}

}

module.exports = BaseFormData;