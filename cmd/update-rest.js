/**************************************************************
Name: update:rest
Description: updates /src/core.rest/db models and controllers,
among others.
**************************************************************/
const fs = require("fs-extra");
const ejs = require("ejs");
const path = require("path");
const Timer = require("just-a-timer");
const prettier = require("prettier");
const config = require(__dirname + "/../expolium.config.js");
const exportJson = require(__dirname + "/update-rest/export.json");
const es6Template = require("es6-template-strings");
const isHardUpdate = false;

class SqlInspector {

	static get DEFAULT_PRETTIER_OPTIONS() {
		return {
			parser:"babel",
			printWidth: 300,
			proseWrap: "never",
			tabWidth: 4
		};
	}

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
				CASE WHEN COLUMNS.column_type LIKE "% unsigned%" THEN TRUE 
					ELSE FALSE
				END AS 'IS UNSIGNED',
			    COLUMNS.COLUMN_DEFAULT AS 'COLUMN DEFAULT VALUE',
			    COLUMNS.EXTRA AS 'COLUMN EXTRA INFORMATION',
			    COLUMNS.DATA_TYPE AS 'COLUMN DATA TYPE',
			    COLUMNS.ORDINAL_POSITION AS 'COLUMN ORDER',
			    COLUMNS.CHARACTER_SET_NAME AS 'COLUMN CHARSET',
			    COLUMNS.COLLATION_NAME AS 'COLUMN COLLATION',
			    COLUMNS.CHARACTER_MAXIMUM_LENGTH AS 'COLUMN TEXT MAX',
			    COLUMNS.CHARACTER_OCTET_LENGTH AS 'COLUMN TEXT MAX BYTES',
			    COLUMNS.NUMERIC_PRECISION AS 'COLUMN NUMERIC PRECISION',
			    COLUMNS.NUMERIC_SCALE AS 'COLUMN NUMERIC SCALE',
			    COLUMNS.COLUMN_KEY AS 'COLUMN KEY',
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
			WHERE TABLES.TABLE_SCHEMA = '${databaseName}'
			ORDER BY TABLES.TABLE_NAME, COLUMNS.ORDINAL_POSITION;`;
		return sequelize.query(sqlQuery);
	}

	static __query(sequelize, databaseName) {
		// @UNCOMMENT to update from database:
		if(isHardUpdate) {
			return this._query(sequelize, databaseName);
		} else {
			return new Promise((resolve, reject) => {
				resolve(JSON.parse(fs.readFileSync(__dirname + "/update-rest/cached.json").toString()));
			});
		}
	}

	static inspect(sequelize, extensionObject = {}, databaseName = false) {
		return new Promise((resolve, reject) => {
			this.__query(sequelize, databaseName ? databaseName : sequelize.getDatabaseName()).then(results => {
				// @UNCOMMENT to cache the results from database:
				if(isHardUpdate) {
					fs.writeFileSync(__dirname + "/update-rest/cached.json", JSON.stringify(results), "utf8");
				}
				const shaped = this._flatten(results).reduce((o, item) => {
					const database = item["DATABASE"];
					const table = item["TABLE"];
					const column = item["COLUMN"];
					const columnType = item["COLUMN TYPE"];
					const columnNullable = item["COLUMN NULLABLE"];
					const isUnsigned = item["IS UNSIGNED"];
					const columnDefault = item["COLUMN DEFAULT VALUE"];
					const columnExtra = item["COLUMN EXTRA INFORMATION"];
					const columnDataType = item["COLUMN DATA TYPE"];
					const columnOrder = item["COLUMN ORDER"];
					const columnCharset = item["COLUMN CHARSET"];
					const columnCollation = item["COLUMN COLLATION"];
					const columnMaxLength = item["COLUMN TEXT MAX"];
					const columnMaxBytes = item["COLUMN TEXT MAX BYTES"];
					const columnNumericPrecision = item["COLUMN NUMERIC PRECISION"];
					const columnNumericScale = item["COLUMN NUMERIC SCALE"];
					const columnKey = item["COLUMN KEY"];
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
						o[database][table][column].type = columnDataType;
						o[database][table][column].fulltype = columnType;
						o[database][table][column].nullable = columnNullable;
						o[database][table][column].default = columnDefault;
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
					if(boundConstraint || referencedTable || referencedColumn || columnKey) {
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
									columnKey,
									boundConstraint,
								});
							} else if(boundConstraint.startsWith("UNIQUE")) {
								o[database][table][column].hasUniqueRule = true;
								o[database][table][column].boundConstraints.push({
									columnKey,
									boundConstraint,
								});
							} else if(boundConstraint.startsWith("FK")) {
								o[database][table][column].isForeignKey = true;
								o[database][table][column].boundConstraints.push({
									columnKey,
									boundConstraint,
									referencedTable,
									referencedColumn,
								});
							}
						}
					}
					o[database][table][column].unsigned = isUnsigned;
					o[database][table][column].extra = columnExtra;
					o[database][table][column].order = columnOrder;
					o[database][table][column].charset = columnCharset;
					o[database][table][column].collation = columnCollation;
					o[database][table][column].maxLength = columnMaxLength;
					o[database][table][column].maxBytes = columnMaxBytes;
					o[database][table][column].numericPrecision = columnNumericPrecision;
					o[database][table][column].numericScale = columnNumericScale;
					return o;
				}, {});
				return resolve(shaped);
			}).catch(error => {
				return reject(error);
			});
		});
	}

	static getDifferentNames(name, label = "") {
		return {
			[label.length === 0 ? "capitalized": label + "Capitalized"]: this.capitalize(name),
			[label.length === 0 ? "camelized": label + "Camelized"]: this.camelize(name),
			[label.length === 0 ? "snakized": label + "Snakized"]: undefined,
		};
	}

	static capitalize(str, startCapital = true) {
		let o = "";
		let capitalizeNext = startCapital;
		str.split("").forEach(c => {
			if(c === "_") {
				capitalizeNext = true;
			} else if(capitalizeNext) {
				o += c.toUpperCase();
				capitalizeNext = false;
			} else {
				o += c;
			}
		})
		return o;
	}

	static camelize(str) {
		return this.capitalize(str, false);
	}

	static beautifyJavascript(code) {
		try {
			return prettier.format(code, Object.assign({}, this.DEFAULT_PRETTIER_OPTIONS, {}));
		} catch(error) {
			throw error;
			return error.toString();
		}
	}

	static generateFilesPerTable(label, overridenFile, sotfOverridenFile, results, exportJson, project, extra) {
		const baseModelTemplate = fs.readFileSync(overridenFile).toString();
		const labelCapitalized = this.capitalize(label);
		const baseModelPathTemplate = exportJson["Base" + labelCapitalized];
		const modelTemplate = fs.readFileSync(sotfOverridenFile).toString();
		const modelPathTemplate = exportJson[labelCapitalized];
		Object.keys(results).forEach(database => {
			const databaseContent = results[database];
			Object.keys(databaseContent).forEach(table => {
				const tableContent = databaseContent[table];
				const tableVariables = {
					table: table,
					tableContent: tableContent,
					Model: this.capitalize(table),
					model: this.camelize(table),
					database: database, 
					databaseConnection: exportJson.databaseConnectionId,
					databaseContent: databaseContent,
					require: require,
					...extra
				};
				const baseModelFilepathPart = ejs.render(baseModelPathTemplate, tableVariables);
				const baseModelFilepath = path.resolve(project, baseModelFilepathPart);
				const modelFilepathPart = ejs.render(modelPathTemplate, tableVariables);
				const modelFilepath = path.resolve(project, modelFilepathPart);
				tableVariables.baseModelFilepath = baseModelFilepath;
				tableVariables.modelFilepath = modelFilepath;
				const baseModelContents = ejs.render(baseModelTemplate, tableVariables);
				//console.log("Regenerating " + label + " at:\n  - " + baseModelFilepath);
				fs.outputFileSync(baseModelFilepath, this.beautifyJavascript(baseModelContents), "utf8");
				if((!fs.existsSync(modelFilepath)) || exportJson.overrideAll) {
					const modelContents = ejs.render(modelTemplate, tableVariables);
					//console.log("Generating " + label + " at:\n  - " + modelFilepath);
					fs.outputFileSync(modelFilepath, this.beautifyJavascript(modelContents), "utf8");
				}
			});
		});

	}

	static generateModels(results, exportJson, project, extra) {
		return this.generateFilesPerTable("model", __dirname + "/update-rest/BaseModel.js.ejs", __dirname + "/update-rest/Model.js.ejs", results, exportJson, project, extra);
	}

	static generateControllers(results, exportJson, project, extra) {
		return this.generateFilesPerTable("controller", __dirname + "/update-rest/BaseController.js.ejs", __dirname + "/update-rest/Controller.js.ejs", results, exportJson, project, extra);
	}

	static generateRestClient(results, exportJson, project, extra) {
		return this.renderGeneralFile(__dirname + "/update-rest/rest-client.api.js", exportJson.restClient, results, exportJson, project, extra);
	}

	static renderGeneralFile(fileSrc, fileDst, results, exportJson, project, extra = {}) {
		const template = fs.readFileSync(fileSrc).toString();
		Object.keys(results).forEach(database => {
			const databaseContent = results[database];
			const templateParameters = {
				database: database, 
				databaseConnection: exportJson.databaseConnectionId,
				databaseContent: databaseContent,
				results: databaseContent,
				exportJson: exportJson,
				project: project,
				require: require,
				...extra
			};
			const outputPath = path.resolve(project, ejs.render(fileDst, templateParameters));
			const contents = ejs.render(template, templateParameters);
			console.log("Generating:\n  - " + outputPath);
			fs.outputFileSync(outputPath, contents, "utf8");
		});
	}

	static generateModelsImporter(results, exportJson, project, extra) {
		return this.renderGeneralFile(__dirname + "/update-rest/models.ejs", exportJson.models, results, exportJson, project, extra);
	}

	static generateControllersImporter(results, exportJson, project, extra) {
		return this.renderGeneralFile(__dirname + "/update-rest/controllers.ejs", exportJson.controllers, results, exportJson, project, extra);
	}

	static generatePostmanCollection(results, exportJson, project, extra) {
		this.renderGeneralFile(__dirname + "/update-rest/postman-collection.ejs", exportJson.PostmanCollection, results, exportJson, project, extra);
		//JSON.parse(fs.readFileSync(path.resolve(exportJson.PostmanCollection)).toString());
	}

	static generateFormsCollection(results, exportJson, project, extra) {
		this.renderGeneralFile(__dirname + "/update-rest/forms-collection.ejs", exportJson.FormsCollection, results, exportJson, project, extra);
		//JSON.parse(fs.readFileSync(path.resolve(exportJson.FormsCollection)).toString());
	}

	static generateTemplateController(results, exportJson, project, extra) {
		// const outputPath = path.resolve(project, ejs.render(exportJson.template, {
		// 	databaseConnection: exportJson.databaseConnectionId,
		// }));
		//fs.copyFileSync(__dirname + "/update-rest/template.ejs", outputPath);
		//fs.copySync(__dirname + "/update-rest/template", outputPath.replace(/\.[^\.]+$/g, ""));
	}

	static mapFormInjections(results) {
		Object.keys(results).forEach(database => {
			Object.keys(results[database]).forEach(table => {
				Object.keys(results[database][table]).forEach(column => {
					Object.keys(results[database][table][column]).forEach(field => {
						// @TODO:
						return
							const { $value } = results[database][table][column];
							results[database][table][column] = es6Template($value, {
								require,
								results, 
								database, 
								table,
								column
							});
						
					});
				});
			});
		});
	}

}

const timer = new Timer();

require(__dirname + "/../src/load.js").then(runner => {
	
	const extension = JSON.parse(fs.readFileSync(process.env.PROJECT_ROOT + "/core/config/" + exportJson.databaseConnectionId + ".extension.json").toString());

	SqlInspector.inspect(runner.app[exportJson.databaseConnectionId], extension).then(resultsReceived => {
		const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");
		//const results = SqlInspector.mapFormInjections(resultsReceived);
		const results = resultsReceived;
		runner.app[exportJson.databaseConnectionId].close();
		console.log("The successfull operation took: " + (timer.time()/1000) + " milliseconds.");
		SqlInspector.generateModels(results, exportJson, process.env.PROJECT_ROOT, runner, {StringUtils});
		fs.writeFileSync(process.env.PROJECT_ROOT + "/core/config/" + exportJson.databaseConnectionId + ".json", JSON.stringify(results, null, 2), "utf8");
		SqlInspector.generateModelsImporter(results, exportJson, process.env.PROJECT_ROOT, {StringUtils});
		SqlInspector.generatePostmanCollection(results, exportJson, process.env.PROJECT_ROOT, {StringUtils});
		SqlInspector.generateFormsCollection(results, exportJson, process.env.PROJECT_ROOT, {StringUtils});
		SqlInspector.generateTemplateController(results, exportJson, process.env.PROJECT_ROOT, {StringUtils});
		SqlInspector.generateControllers(results, exportJson, process.env.PROJECT_ROOT, {StringUtils});
		SqlInspector.generateRestClient(results, exportJson, process.env.PROJECT_ROOT, {StringUtils});
	}).catch(error => {
		console.log("ERROR", error);
		runner.app[exportJson.databaseConnectionId].close();
		console.log("The erroneous operation took: " + (timer.time()/1000) + " milliseconds.");
	});
});
