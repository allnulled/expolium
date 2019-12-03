const fs = require("fs");
const path = require("path");
const express = require("express");
const http = require("http");
const https = require("https");
const BaseAppLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("BaseApp");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const ReflectionUtils = require(process.env.PROJECT_ROOT + "/core/helper/ReflectionUtils.js");
const OverridableClass = require(process.env.PROJECT_ROOT + "/core/helper/OverridableClass.js");
const AppParameters = require(process.env.PROJECT_ROOT + "/core/type/AppParameters.js");
const BaseRouter = require(process.env.PROJECT_ROOT + "/core/router/BaseRouter.js");
const BaseRunner = require(process.env.PROJECT_ROOT + "/core/runner/BaseRunner.js");

class BaseApp extends OverridableClass {

	//////////////////////////////////////////////////////

	static get routerClass() {
		throw new ErrorManager.classes.MustOverrideError("BaseApp[.constructor].routerClass");
	}

	static getAppExtensionFilepaths() {
		return [
			path.resolve(__dirname, "extension", "ParseBodyExtension.js"),
			path.resolve(__dirname, "extension", "FrameworkExtension.js"),
			path.resolve(__dirname, "extension/response", "EjsPageResponseExtension.js"),
			path.resolve(__dirname, "extension/response", "EjsResponseExtension.js"),
			path.resolve(__dirname, "extension/response", "EjsTextResponseExtension.js"),
			path.resolve(__dirname, "extension/response", "HtmlResponseExtension.js"),
			path.resolve(__dirname, "extension/response", "HtmlFileResponseExtension.js"),
			path.resolve(__dirname, "extension/response", "JsonResponseExtension.js"),
			path.resolve(__dirname, "extension/response", "TextResponseExtension.js"),
			path.resolve(__dirname, "extension/response", "DownloadResponseExtension.js"),
		];
	}

	get settingsFile() {
		throw new ErrorManager.classes.MustOverrideError("BaseApp.settingsFile");
	}

	get mainDatabaseFile() {
		throw new ErrorManager.classes.MustOverrideError("BaseApp.mainDatabaseFile");
	}
	
	get otherDatabaseFiles() {
		return [];
	}

	//////////////////////////////////////////////////////
	constructor(options = {}, callback = undefined) {
		super(options, callback);
		BaseAppLogger.log("constructor");
		this.$app = express();
		this.router = new this.constructor.routerClass({ app: this });
		if(!(this.runner instanceof require(process.env.PROJECT_ROOT + "/core/runner/BaseRunner.js"))) {
			throw new ErrorManager.classes.RequiredTypeError("BaseApp.runner must be a BaseRunner instance");
		}
		if(!(this.router instanceof require(process.env.PROJECT_ROOT + "/core/router/BaseRouter.js"))) {
			throw new ErrorManager.classes.RequiredTypeError("BaseApp.router must be a BaseRouter instance");
		}
		this.isLoaded = false;
	}

	//////////////////////////////////////////////////////

	getLoadMethods() {
		BaseAppLogger.log("getLoadMethods");
		return [
			"stepSkipConditionally",
			"stepLoadSettings",
			"~stepLoadDatabases",
			"~stepLoadAppExtensions",
			"stepLoadRouter",
			"stepLoadServer",
			"stepLoadSecureServer",
		]
	}

	getStartMethods() {
		BaseAppLogger.log("getStartMethods");
		return [
			"~stepStartServer",
			"~stepStartSecureServer",
			//"stepWatchdogToUpdateRouter",
		]
	}

	//////////////////////////////////////////////////////

	load(parameters = {}) {
		BaseAppLogger.log("load");
		const _ = new AppParameters(parameters);
		return ReflectionUtils.gateway(this, this.getLoadMethods(), _);
	}

	start(parameters = {}) {
		BaseAppLogger.log("start");
		const _ = new AppParameters(parameters);
		return this.load(this, this.getLoadMethods(), _).then(() => {
			return ReflectionUtils.gateway(this, this.getStartMethods(), _);
		});
	}

	//////////////////////////////////////////////////////

	stepSkipConditionally(_) {
		BaseAppLogger.log("stepSkipConditionally");
		if(this.isLoaded) {
			_.output.isLoaded = true;
			_.exit = true;
			return;
		}
	}

	stepLoadSettings(_) {
		BaseAppLogger.log("stepLoadSettings");
		this.settings = fs.readFileSync(this.settingsFile).toString();
	}

	async stepLoadDatabases(_) {
		BaseAppLogger.log("stepLoadDatabases");
		const dbConnectionFiles = [].concat(this.mainDatabaseFile).concat(this.otherDatabaseFiles);
		try {
			for(let connectionFile of dbConnectionFiles) {
				const connectionPromise = require(connectionFile);
				const connection = await connectionPromise;
				const connectionId = path.basename(connectionFile).replace(/\.[^/\.]+$/, "");
				this[connectionId] = connection;
				BaseAppLogger.log(`database connection "${connectionId}" stablished successfully`);
			}
		} catch(error) {
			BaseAppLogger.log("error connecting database:", error);
			throw error;
		}
	}

	async stepLoadAppExtensions(_) {
		BaseAppLogger.log("stepLoadAppExtensions");
		const files = this.constructor.getAppExtensionFilepaths();
		for(let file of files) {
			const filepath = path.resolve(__dirname + "/extension", file);
			BaseAppLogger.log("Loading app extension from:", filepath);
			const ExtensionType = require(filepath);
			await ExtensionType.extendApp(this);
		}
	}

	stepLoadRouter(_) {
		BaseAppLogger.log("stepLoadRouter");
		this.router.configure();
		this.$app.all("*", (...args) => {
			BaseAppLogger.log("Request happened.");
			this.router.$$router(...args);
		});
	}

	stepLoadServer(_) {
		BaseAppLogger.log("stepLoadServer");
		this.$server = http.createServer(this.$app);
	}

	stepLoadSecureServer(_) {
		BaseAppLogger.log("stepLoadSecureServer");
		this.$secureServer = undefined;// https.createServer(this.$app);
	}

	stepStartServer(_) {
		BaseAppLogger.log("stepStartServer");
		return new Promise((resolve, reject) => {
			return this.$server.listen(process.env.SERVER_PORT, () => {
				BaseAppLogger.log("server listening at " + this.$server.address().address + ":" + process.env.SERVER_PORT);
				return resolve();
			});
		});
	}

	stepStartSecureServer(_) {
		BaseAppLogger.log("stepStartSecureServer");
		return new Promise((resolve, reject) => {
			//return this.$secureServer.listen(process.env.SECURE_SERVER_PORT, () => {
				return resolve();
			//});
		});
	}

	stepWatchdogToUpdateRouter(_) {
		BaseAppLogger.log("stepWatchdogToUpdateRouter");
		const chokidar = require("chokidar");
		chokidar.watch(process.env.PROJECT_ROOT + "/*/controller/autoload/**/*").on("change", (file, details) => {
			BaseAppLogger.log("file:", file);
			BaseAppLogger.log("details:", details);
			this.router.configure();
		});
	}

	getCloseAllMethods() {
		return ["~stepCloseDatabases", "~stepCloseServers"];
	}

	closeAll(parameters = {}) {
		BaseAppLogger.log("closeAll");
		const _ = new AppParameters(parameters);
		return ReflectionUtils.gateway(this, this.getCloseAllMethods(), _);
	}

	async stepCloseDatabases(_) {
		BaseAppLogger.log("stepCloseDatabases");
		const connectionNames = [this.mainDatabaseFile, ...this.otherDatabaseFiles].map(connectionFile => path.basename(connectionFile).replace(/\.[^/\.]+$/, ""));
		try {
			for(let connectionName of connectionNames) {
				const connection = this[connectionName];
				if(typeof connection.close === "function") { // then we supose it is like sequelize connection, so:
					await connection.close();
				}
			}
		} catch(error) {
			BaseAppLogger.log("error closing database connection:", error);
			throw error;
		}
	}

	async stepCloseServers(_) {
		BaseAppLogger.log("stepCloseServers");
		try {
			if(this.server) {
				this.server.close();
			}
			if(this.secureServer) {
				this.secureServer.close();	
			}
		} catch(error) {
			BaseAppLogger.log("error closing servers:", error);
			throw error;
		}
	}

}

module.exports = BaseApp;