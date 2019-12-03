class GlobalsManager {

	static get globals() {
		return {};
	}

	static set(name, value) {
		this.globals[name] = value;
	}

	static get(name, defaultValue = undefined) {
		return name in this.globals ? this.globals[name] : defaultValue;
	}

}

module.exports = GlobalsManager;