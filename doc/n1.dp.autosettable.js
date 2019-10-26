class SelfInitialized {
	
	static get DEFAULT() {
		return {};
	}

	constructor(options = {}) {
		Object.assign(this, this.constructor.DEFAULT, options);
	}

} 