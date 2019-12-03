const BaseDatabaseConnector = require(__dirname + "/base/BaseDatabaseConnector.js");
const Sequelize = require("sequelize");

class SequelizeDatabaseConnector extends BaseDatabaseConnector {

	getDatabaseConnection() {
		return new Promise((resolve, reject) => {
			if(typeof this.databaseConnection !== "undefined") {
				return this.databaseConnection;
			}
			const { database, user, password, host, port } = this.credentials;
			const { options } = this;
			const connection = new Sequelize(database, user, password, {
				...options,
				host,
				port,
			});
			connection.authenticate().then(() => {
				this.databaseConnection = connection;
				resolve(this.databaseConnection);
			}).catch(error => {
				reject(error);
			});
		});
	}

}

module.exports = SequelizeDatabaseConnector;