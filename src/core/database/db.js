const SequelizeDatabaseConnector = require(__dirname + "/connector/SequelizeDatabaseConnector.js");

const connector = new SequelizeDatabaseConnector({ prefix: "DB_" });

module.exports = connector.getDatabaseConnection();