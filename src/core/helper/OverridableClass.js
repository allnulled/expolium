class OverridableClass {

	constructor(options = {}, compute = () => {}) {
		if(typeof options === "object") {
			Object.assign(this, this.constructor.defaultOptions || {}, options);
			if(typeof compute === "function") {
				compute(this);
			}
		}
	}

}

module.exports = OverridableClass;