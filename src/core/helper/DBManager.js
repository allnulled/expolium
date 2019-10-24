const path = require("path");
const Sequelize = require("sequelize");

class DBManager {

	static get DEFAULT_CREDENTIALS() {
		return {
			database: "test",
			user: "root", 
			password: null, 
			host: "localhost", 
			port: 3306
		};
	}

	static get DEFAULT_OPTIONS() {
		return {
			dialect: "mysql"
		};
	}

	static create(...args) {
		return new DBManager(...args);
	}

	static getCredentialsFromEnvPrefix(prefix) {
		const database = process.env[prefix + "NAME"];
		const user = process.env[prefix + "USER"];
		const password = process.env[prefix + "PASS"];
		const host = process.env[prefix + "HOST"];
		const port = process.env[prefix + "PORT"];
		return { database, user, password, host, port };
	}

	static createFromEnvPrefix(prefix) {
		return this.create(this.getCredentialsFromEnvPrefix(prefix));
	}

	constructor(credentials = {}, options = {}) {
		this.credentials = {};
		this.options = {};
		Object.assign(this.options, this.constructor.DEFAULT_OPTIONS, options);
		Object.assign(this.credentials, this.constructor.DEFAULT_CREDENTIALS, credentials);
		this.$sequelize = new Sequelize(this.credentials.database, this.credentials.user, this.credentials.password, {...this.credentials, ...this.options});
	}

	openConnection() {
		return this.$sequelize.authenticate();
	}

	getConnection() {
		return this.$sequelize;
	}

	closeConnection() {
		this.$sequelize.close();
	}

}

module.exports = DBManager;