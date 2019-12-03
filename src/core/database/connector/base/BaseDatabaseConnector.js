const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const OverridableClass = require(process.env.PROJECT_ROOT + "/core/helper/OverridableClass.js");

class BaseDatabaseConnector extends OverridableClass {

	static get DEFAULT_OPTIONS() {
		return {
			dialect: "mysql"
		};
	}

	constructor(options = {}) {
		super(options);
		if (typeof options !== "object") {
			throw new ErrorManager.classes.RequiredTypeError("BaseDatabaseConnector.constructor(~) must be an object");
		}
		if (typeof this.prefix !== "string") {
			throw new ErrorManager.classes.RequiredTypeError("BaseDatabaseConnector.prefix must be a string");
		}
		this.credentials = this.constructor.getCredentialsFromEnvPrefix(this.prefix);
		this.options = Object.assign({}, this.constructor.DEFAULT_OPTIONS, this.options);
	}

	static getCredentialsFromEnvPrefix(prefix = "DB_") {
		if (!(`${prefix}ID` in process.env)) {
			throw new ErrorManager.classes.PropertyNotFoundError(`${prefix}ID in process.env`);
		}
		if (!(`${prefix}NAME` in process.env)) {
			throw new ErrorManager.classes.PropertyNotFoundError(`${prefix}NAME in process.env`);
		}
		if (!(`${prefix}USER` in process.env)) {
			throw new ErrorManager.classes.PropertyNotFoundError(`${prefix}USER in process.env`);
		}
		if (!(`${prefix}PASSWORD` in process.env)) {
			throw new ErrorManager.classes.PropertyNotFoundError(`${prefix}PASSWORD in process.env`);
		}
		if (!(`${prefix}HOST` in process.env)) {
			throw new ErrorManager.classes.PropertyNotFoundError(`${prefix}HOST in process.env`);
		}
		if (!(`${prefix}PORT` in process.env)) {
			throw new ErrorManager.classes.PropertyNotFoundError(`${prefix}PORT in process.env`);
		}
		const id = process.env[`${prefix}ID`];
		const database = process.env[`${prefix}NAME`];
		const user = process.env[`${prefix}USER`];
		const password = process.env[`${prefix}PASSWORD`];
		const host = process.env[`${prefix}HOST`];
		const port = process.env[`${prefix}PORT`];
		const otherProperties = Object.keys(process.env).reduce((out, key) => {
			if (key.startsWith(prefix)) {
				if ([
						`${prefix}ID`,
						`${prefix}NAME`,
						`${prefix}USER`,
						`${prefix}PASSWORD`,
						`${prefix}HOST`,
						`${prefix}PORT`
					].indexOf(key) === -1) {
					out[key.replace(prefix, "").toLowerCase()] = process.env[key];
				}
			}
			return out;
		}, {});
		return {
			id,
			database,
			user,
			password,
			host,
			port,
			...otherProperties
		};
	}

	// Expected to return a Promise:
	getDatabaseConnection() {
		throw new ErrorManager.classes.MustOverrideError("BaseDatabaseConnector.getDatabaseConnection => (Promise)");
	}

}

module.exports = BaseDatabaseConnector;