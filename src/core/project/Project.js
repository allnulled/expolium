const path = require("path");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const App = require(process.env.PROJECT_ROOT + "/core/app/App.js");

class Project {

	static get defaultOptions() {
		return {};
	}

	static get appClass() {
		return App;
	}

	constructor(optionsParameter = {}) {
		const options = Object.assign({}, this.constructor.defaultOptions, optionsParameter);
		const appOptions = Object.assign({}, {project:this}, options && options.appOptions ? options.appOptions : {});
		const App = this.constructor.appClass;
		const app = new App(appOptions);
		this.app = app;
		if(typeof options !== "object")
			throw new ErrorManager.classes.RequiredTypeError("object");
		Object.keys(options).forEach(prop => this[prop] = options[prop]);
	}

	resolve(p1, ...args) {
		return path.resolve(process.env.PROJECT_ROOT, p1.replace(/^\@?\//g,""), ...args);
	}

	async load() {
		try {
			await this.app.init();
			await this.app.mount();
			return this;
		} catch(error) {
			ErrorManager.throw(error);
		}
	}

	async start() {
		try {
			await this.load();
			await this.app.deploy();
			return this;
		} catch(error) {
			ErrorManager.throw(error);
		}
	}

}

module.exports = Project;