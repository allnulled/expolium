const fs = require("fs");
const http = require("http");
const express = require("express");
const path = require("path");
const moment = require("moment");
const chokidar = require("chokidar");
const bodyParser = require("body-parser");
const importFresh = require("import-fresh");
const DBManager = require(process.env.PROJECT_ROOT + "/core/helper/DBManager.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const LoggerManager = require(process.env.PROJECT_ROOT + "/core/helper/LoggerManager.js");
const BasicRouter = require(__dirname + "/BasicRouter.js");
const Sequelize = require("sequelize");
const multer = require("multer");
const upload = multer();


class App {

	static get name() {
		throw new Error("Must override App.name");
	}

	static get version() {
		return require(process.env.PROJECT_ROOT + "/../package.json").version;
	}

	static get defaultOptions() {
		return {};
	}

	static get routerClass() {
		return BasicRouter;
	}

	static get mainDatabaseConnection() {
		return "db";
	}

	static get databaseConnections() {
		return {
			// <app property for the db connection>: <env prefix for database credentials>
			"db": "DB_",
			// You can create your own like:
			// "db2": "DB_2"
			// "db3": "DB_3"
			// "db4": "DB_4"
		}
	}

	static get modelsPaths() {
		return [
			process.env.PROJECT_ROOT + "/core.rest/db/model"
		]
	}

	///////////////////////////////////////////////////////////////////////

	static get httpCodes() {
		return {
			[100]: "Continue",
			[101]: "Switching protocols",
			[200]: "OK",
			[201]: "Created",
			[202]: "Accepted",
			[203]: "Non-authoritative information",
			[204]: "No content",
			[205]: "Reset content",
			[206]: "Partial content",
			[300]: "Multiple choices",
			[301]: "Moved permanently",
			[302]: "Moved temporarily",
			[303]: "See other",
			[304]: "Not modified",
			[305]: "Use proxy",
			[306]: "Unused",
			[307]: "Temporary redirect",
			[400]: "Bad request",
			[401]: "Unauthorized",
			[402]: "Payment required",
			[403]: "Forbidden",
			[404]: "Not found",
			[405]: "Method not allowed",
			[406]: "Not acceptable",
			[407]: "Proxy authentication required",
			[408]: "Request timeout",
			[409]: "Conflict",
			[410]: "Gone",
			[411]: "Length required",
			[412]: "Precondition failed",
			[413]: "Request entity too large",
			[414]: "Request URI too long",
			[415]: "Unsupported media type",
			[416]: "Requested range not satisfiable",
			[417]: "Expectation failed",
			[426]: "Upgrade required",
			[428]: "Precondition required",
			[429]: "Too many requests",
			[431]: "Request header fields too large",
			[500]: "Internal server error",
			[501]: "Not implemented",
			[502]: "Bad gateway",
			[503]: "Service unavailable",
			[504]: "Gateway timeout",
			[505]: "HTTP version not supported",
			[511]: "Network authentication required"
		};
	}

	timeout(time) {
		return new Promise((resolve, reject) => {
			setTimeout(resolve, time);
		});
	}

	constructor(optionsParameter = {}) {
		const options = Object.assign({}, this.constructor.defaultOptions, optionsParameter);
		const routerOptions = Object.assign({}, {app:this}, options && options.routerOptions ? options.routerOptions : {});
		const Router = this.constructor.routerClass;
		console.log(Router);
		const router = new Router(routerOptions);
		this.router = router;
		this.$app = express();
		if(typeof options !== "object")
			throw new ErrorManager.classes.RequiredTypeError("object");
		if(!("project" in options))
			throw new ErrorManager.classes.MustHaveProperty("project");
		Object.keys(options).forEach(prop => this[prop] = options[prop]);
	}

	formatJsonResponse(data, metadata, code) {
		return {
			app: {
				name: this.constructor.name,
				version: this.constructor.version,
			},
			status: {
				is: code < 300 ? "success" : "error",
				code: code,
				message: this.constructor.httpCodes[code],
			},
			[code < 300 ? "data" : "error"]: data,
			metadata: {
				...metadata
			}
		};
	}

	async init() {
		try {
			await this.initLogger();
			await this.initApp();
			await this.initDB();
			await this.initModels();
			this.logger.info("[DONE] App.init");
		} catch(error) {
			console.log(error);
			ErrorManager.handle(error);
		}
	}

	async initApp() {
		// dynamic:
		this.$app.use(bodyParser.urlencoded({ extended: true }));
		this.$app.use(bodyParser.json());
		this.$app.use(upload.array());
		this.$app.use((request, response, next) => {
			request.expolium = {};
			response.expolium = {};
			return next();
		});
		// static:
		const jsonMethods = {
			jsonSuccess: function(data, metadata = {}, code = 200) {
				return this.jsonDispatch(data, metadata, code);
			},
			jsonError: function(error, metadata = {}, code = 500) {
				return this.jsonDispatch(error, metadata, code);
			},
			jsonDispatch: function(data, metadata = {}, code = 200) {
				return this.status(code).json(this.formatJsonResponse(data, metadata, code));
			},
			sendJsonSuccess: function(data, metadata = {}, code = 200) {
				return this.sendJson(data, metadata, code);
			},
			sendJsonError: function(error, metadata = {}, code = 500) {
				return this.sendJson(error, metadata, code);
			},
			sendJson: function(data, metadata = {}, code = 500) {
				return this.jsonDispatch(data, metadata, code).send();
			},
		};
		Object.assign(this.$app.response, jsonMethods);
		this.$app.response.formatJsonResponse = this.formatJsonResponse.bind(this);
	}

	async initDB() {
		try {
			this.logger.info("Connecting all databases!");
			const conns = this.constructor.databaseConnections;
			Object.keys(conns).forEach(key => {
				this[key] = DBManager.createFromEnvPrefix(conns[key]);
			});
			const connectAllDatabases = () => {
				let counter = 0;
				let errors = [];
				const connNames = Object.keys(conns);
				return new Promise((resolve, reject) => {
					const tryNext = () => {
						counter++;
						if(counter === connNames.length) {
							if(errors.length !== 0) {
								return reject(errors);
							}
							return resolve();
						}
					}
					connNames.forEach(key => {
						if(key in this) {
							throw new Error("CannotOverridePropertyName");
						}
						this[key].openConnection().then(connection => {
							tryNext();
						}).catch(error => {
							errors.push(error);
							tryNext();
						});
					});
				});
			}
			await connectAllDatabases();
			this.logger.info("All databases successfully connected!");
		} catch(error) {
			this.logger.error(error);
			ErrorManager.handle(error);
		}
	}

	async initModels() {
		try {
			let paths = [];
			this.constructor.modelsPaths.forEach(modelsPath => {
				const fileStats = fs.lstatSync(modelsPath);
				const isFile = fileStats.isFile();
				const isDirectory = fileStats.isDirectory();
				if(isFile) {
					paths = paths.concat([modelsPath]);
				} else if(isDirectory) {
					paths = paths.concat(
						fs.readdirSync(modelsPath)
							.map(modelPath => path.resolve(modelsPath, modelPath))
							.filter(modelPath => fs.lstatSync(modelPath).isFile())
					);
				}
			});
			this.logger.info("Model paths: ", paths);
			this.models = {};
			paths.forEach(path_ => {
				this.logger.info("Loading model: " + path_);
				const Model = require(path_);
				this.logger.info(Model, Model.definition.databaseConnection);
				//*
				Model.init(Model.definition.columns, {
					Sequelize: Sequelize,
					sequelize: this[Model.definition.databaseConnection].getConnection(),
					tableName: Model.definition.table,
					modelName: Model.definition.name,
					freezeTableName: true,
				});
				//*/
				this.models[Model.definition.name] = Model;
			});
		} catch(error) {
			this.logger.error(error);
			ErrorManager.handle(error);
		}
	}

	async initLogger() {
		try {
			this.loggerManager = LoggerManager.create(__filename);
			this.logger = this.loggerManager.get();
			this.logger.info("app.logger was successfully initialized!");
			this.$app.use(this.loggerManager.getMiddleware());
		} catch(error) {
			this.logger.error(error);
			ErrorManager.handle(error);
		}
	}

	///////////////////////////////////////////////////////////////////////

	async mount() {
		try {
			this.logger.info("[DONE] App.mount");
			await this.mountRouter();
		} catch(error) {
			this.logger.error(error);
			ErrorManager.handle(error);
		}
	}

	///////////////////////////////////////////////////////////////////////
	
	async deploy() {
		try {
			this.logger.info("[DONE] App.deploy");
			await this.deployServer();
			await this.deploySecureServer();
			await this.listenForChanges();
		} catch(error) {
			this.logger.error(error);
			ErrorManager.handle(error);
		}
	}

	///////////////////////////////////////////////////////////////////////

	async mountRouter() {
		try {
			this.logger.info("[DONE] App.mountRouter");
			const app = this.$app;
			app.use(this.router.path, (...args) => {
				this.router.$router(...args);
			});
			this.reset();
		} catch(error) {
			this.logger.error(error);
			ErrorManager.handle(error);
		}
	}

	///////////////////////////////////////////////////////////////////////
	
	async reset() {
		try {
			this.logger.info("[TEST] App.reset");
			this.router.getRouter();
		} catch(error) {
			this.logger.error(error);
			ErrorManager.handle(error);
		}
	}

	///////////////////////////////////////////////////////////////////////
	
	deployServer() {
		return new Promise((resolve, reject) => {
			this.logger.info("[TEST] App.deployServer");
			try {
				this.$server = http.createServer(this.$app);
				this.$server.listen(process.env.APP_PORT, () => {
					this.logger.info(`(*) Server started running at port ${process.env.APP_PORT}!`);
					resolve();
				});
			} catch(error) {
				reject(error);
			}
		});
	}

	async deploySecureServer() {
		try {
			this.logger.info("[NO] App.deploySecureServer");
			
		} catch(error) {
			this.logger.error(error);
			ErrorManager.handle(error);
		}
	}

	async listenForChanges() {
		try {
			chokidar.watch(process.env.PROJECT_ROOT + "/**/*").on("change", async (ev, file) => {
				try {
					await this.reset();
					this.logger.info("(*) Router mounted successfully: " + ev);
					//this.logger.info(this.router.controllers);
				} catch(error) {
					ErrorManager.handle(error);
				}
			});
		} catch(error) {
			this.logger.error(error);
			ErrorManager.handle(error);
		}
	}

}

module.exports = App;