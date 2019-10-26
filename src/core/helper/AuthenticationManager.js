class AuthenticationManager {

	static get DEFAULT() {
		return {data:{}};
	}

	constructor(options = {}) {
		Object.assign(this, this.constructor.DEFAULT || {}, options);
	}

	has(property, operator, value) {

	}

	can(...args) {
		if(args.length === 1) {
			const [permissionId] = args;
			// @TODO...
		} else if(args.length === 2) {
			const [companyName, permissionName] = args;
			// @TODO...
		} else throw new Error("AuthenticationManager.can only accepts 1 integer or 2 names.");
	}

}

module.exports = AuthenticationManager;