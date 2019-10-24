class SqlInspector {

	static _flatten(arr) {
		return arr.reduce((flat, toFlatten) => {
			return flat.concat(Array.isArray(toFlatten) ? this._flatten(toFlatten) : toFlatten);
		}, []);
	}

	static _query(sequelize, databaseName) {
		const sqlQuery = `
			SELECT DISTINCT
			    TABLES.TABLE_SCHEMA AS 'DATABASE',
			    TABLES.TABLE_NAME AS 'TABLE',
			    COLUMNS.COLUMN_NAME AS 'COLUMN',
			    COLUMNS.COLUMN_TYPE AS 'COLUMN TYPE',
			    COLUMNS.IS_NULLABLE AS 'COLUMN NULLABLE',
			    COLUMNS.COLUMN_DEFAULT AS 'COLUMN DEFAULT VALUE',
			    COLUMNS.EXTRA AS 'COLUMN EXTRA INFORMATION',
			    KEY_COLUMN_USAGE.CONSTRAINT_NAME AS 'BOUND CONSTRAINT',
			    KEY_COLUMN_USAGE.REFERENCED_TABLE_NAME AS 'REFERENCED TABLE',
			    KEY_COLUMN_USAGE.REFERENCED_COLUMN_NAME AS 'REFERENCED COLUMN'
			FROM INFORMATION_SCHEMA.TABLES TABLES
			LEFT JOIN INFORMATION_SCHEMA.COLUMNS COLUMNS ON 
				COLUMNS.TABLE_SCHEMA = TABLES.TABLE_SCHEMA AND
				COLUMNS.TABLE_NAME = TABLES.TABLE_NAME
			LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE KEY_COLUMN_USAGE ON
				KEY_COLUMN_USAGE.TABLE_SCHEMA = TABLES.TABLE_SCHEMA AND 
				KEY_COLUMN_USAGE.TABLE_NAME = TABLES.TABLE_NAME AND
				KEY_COLUMN_USAGE.COLUMN_NAME = COLUMNS.COLUMN_NAME
			WHERE TABLES.TABLE_SCHEMA = '${databaseName}';`;
		return sequelize.query(sqlQuery);
	}

	static inspect(sequelize, databaseName, extensionObject = {}) {
		return new Promise((resolve, reject) => {
			this._query(sequelize, databaseName).then(results => {
				return resolve(this._flatten(results).reduce((o, item) => {
					const database = item["DATABASE"];
					const table = item["TABLE"];
					const column = item["COLUMN"];
					const columnType = item["COLUMN TYPE"];
					const columnNullable = item["COLUMN NULLABLE"];
					const columnDefault = item["COLUMN DEFAULT VALUE"];
					const columnExtra = item["COLUMN EXTRA INFORMATION"];
					const boundConstraint = item["BOUND CONSTRAINT"];
					const referencedTable = item["REFERENCED TABLE"];
					const referencedColumn = item["REFERENCED COLUMN"];
					if(!(database in o)) {
						o[database] = {};
					}
					if(!(table in o[database])) {
						o[database][table] = {};
					}
					if(!(column in o[database][table])) {
						o[database][table][column] = {};
						o[database][table][column].type = columnType;
						o[database][table][column].nullable = columnNullable;
						o[database][table][column].default = columnDefault;
						o[database][table][column].extra = columnExtra;
						[
							`*.*.*`,
							`*.*.${column}`,
							`*.${table}.*`,
							`*.${table}.${column}`,
							`${database}.*.*`,
							`${database}.*.${column}`,
							`${database}.${table}.*`,
							`${database}.${table}.${column}`,
						].forEach(matcher => {
							if(matcher in extensionObject) {
								o[database][table][column] = {...o[database][table][column], ...extensionObject[matcher]};
							}
						});
					}
					if(boundConstraint || referencedTable || referencedColumn) {
						if(!(o[database][table][column].boundConstraints)) {
							o[database][table][column].boundConstraints = [];
						}
						let wasAlready = false;
						o[database][table][column].boundConstraints.forEach(bound => {
							if(bound.boundConstraint === boundConstraint) {
								wasAlready = true;
							}
						});
						if(!wasAlready) {
							if(boundConstraint.startsWith("PRIMARY")) {
								o[database][table][column].isPrimaryKey = true;
								o[database][table][column].boundConstraints.push({
									boundConstraint,
								});
							} else if(boundConstraint.startsWith("UNIQUE")) {
								o[database][table][column].hasUniqueRule = true;
								o[database][table][column].boundConstraints.push({
									boundConstraint,
								});
							} else if(boundConstraint.startsWith("FK")) {
								o[database][table][column].isForeignKey = true;
								o[database][table][column].boundConstraints.push({
									boundConstraint,
									referencedTable,
									referencedColumn,
								});
							}
						}
					}
					return o;
				}, {}));
			}).catch(error => {
				return reject(error);
			});
		});
	}

}

const fs = require("fs");

module.exports = function(req, res, next) {
	const extension = JSON.parse(fs.readFileSync(process.env.PROJECT_ROOT + "/myproject/config/db.extension.json").toString());
	SqlInspector.inspect(this.router.app.db.$sequelize, process.env.DB_NAME, extension).then(results => {
		// @TODO...
		fs.writeFileSync(process.env.PROJECT_ROOT + "/myproject/config/db.json", JSON.stringify(results, null, 2), "utf8");
		res.status(200).json(results);
	}).catch(error => {
		// @TODO...
		res.status(500).json(error);
	});
};