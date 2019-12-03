const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const OverridableClass = require(process.env.PROJECT_ROOT + "/core/helper/OverridableClass.js");

class Dependency extends OverridableClass {

	static get DEFAULT_VALUE() {
		return {
			id: undefined,
			dependsOn: [],
			contents: undefined,
			parameters: [],
		};
	}

	constructor(options = {}) {
		super(options);
		if(typeof this.id === "undefined" || (typeof this.id !== "string" && this.id !== null)) {
			throw new ErrorManager.classes.RequiredTypeError("Dependency.id must be a string or null");
		}
		if(typeof this.contents === "undefined" || (typeof this.contents !== "string" && !Array.isArray(this.contents)) {
			throw new ErrorManager.classes.RequiredTypeError("Dependency.contents must be a string or array of strings");
		}
	}

}

class DependencyManager extends OverridableClass {

	static get Dependency() {
		return Dependency;
	}

	static get DEFAULT_DEPENDENCIES() {
		return process.env.PROJECT_ROOT + "/core/config/dependencies.json";
	}

	constructor(options = {}) {
		super(options);
		if(typeof this.dependencies === "string") {
			this.dependencies = require(this.dependencies);
		} else if(typeof this.dependencies === "object") {
			
		}
		if(typeof this.dependencies !== "object") {
			throw new ErrorManager.classes.RequiredTypeError("DependencyManager.dependencies must be an object");
		}
		this.dependencies = Object.keys(this.dependencies).reduce((out, dependencyName) => {
			if(!(dependencyName in out)) {
				return out;
			}
			let dependency = undefined;
			if(this.dependencies[dependencyName] instanceof this.constructor.Dependency) {
				dependency = this.dependencies[dependencyName];
			} else {
				dependency = new this.constructor.Dependency(this.dependencies[dependencyName]);
			}
			if(!(dependency instanceof this.constructor.Dependency)) {
				throw new ErrorManager.classes.RequiredTypeError("DependencyManager.dependencies.* must be or be convertable to DependencyManager.Dependency");
			}
			out[dependency.id] = dependency;
			return out;
		}, {});
	}

	addDependency(dependency) {
		if(!dependency instanceof this.constructor.Dependency) {
			dependency = new this.constructor.Dependency(dependency);
		}
		if(!dependency instanceof this.constructor.Dependency) {
			throw new ErrorManager.classes.RequiredTypeError("DependencyManager.addDependency(#1): #1 must be a DependencyManager[.constructor].Dependency instance");
		}
		if(dependency.id in this.dependencies) {
			return false;
		} else {
			this.dependencies[dependency.id] = dependency;
		}
		return true;
	}

	onSortDependencies(all) {
		return function(dependency1, dependency2) {
			const d1 = all[dependency1];
			const d2 = all[dependency2];
			if(d1.id === null && d2.id === null) {
				return 0;
			} else if(d1.id === null) {
				return -1;
			} else if(d2.id === null) {
				return 1;
			}
			return d1.dependsOn.indexOf(d2.id) !== -1 ? 1 : d2.dependsOn.indexOf(d1.id) !== -1 ? -1 : 0;
		};
	}

	toString() {
		let out = "";
		Object.keys(this.dependencies).sort(this.onSortDependencies(this.dependencies)).forEach(dependency => {
			out += "    " + [].concat(dependency.contents).join("\n    ");
		});
		return out;
	}

}

module.exports = DependencyManager;