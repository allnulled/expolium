const moment = require("moment");
const BasicController = require(process.env.PROJECT_ROOT + "/core/controller/BasicController.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const ParametersManager = require(process.env.PROJECT_ROOT + "/core/helper/ParametersManager.js");
const CollectionManager = require(process.env.PROJECT_ROOT + "/core/helper/CollectionManager.js");
const ReflectionManager = require(process.env.PROJECT_ROOT + "/core/helper/ReflectionManager.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");
const dd = require(process.env.PROJECT_ROOT + "/core/helper/dd.js");
const squel = require("squel");
const Sequelize = require("sequelize");

class LogoutController extends BasicController {

	constructor(options = {}) {
		super(options);
		this.method = "post";
		this.controller = this.logoutCallback.bind(this);
	}

	static getLogoutSteps() {
		return [
			"onPrepareSelectSessionQuery",
			"onPrepareSelect",
			"onPrepareFrom",
			"onPrepareFields",
			"onPrepareWhereCredentials",
			"~onQueryForSession",
			"onCheckForUser",
			"onCheckForPassword",
			"onCheckForSession",
			"onPrepareDeleteSessionQuery",
			"onPrepareDelete",
			"onPrepareDeleteFrom",
			"onPrepareDeleteWhereCredentials",
			"~onQueryForSessionDeletion",
			"onRemoveSessionToken",
			"onResponse",
		];
	}

	logoutCallback(request, response, next) {
		return this.constructor.logout(new ParametersManager({ 
			headers: request.headers, 
			controller: this, 
			controllerClass: this.constructor,
			request: request,
			response: response,
			next: next,
		}));
	}

	static logout(_) {
		return ReflectionManager.gateway(this, this.getLogoutSteps(), _);
	}

	static onPrepareSelectSessionQuery(_) {
		// Empty is ok.
	}

	static onPrepareSelect(_) {
		_.storage.selectSessionQuery = squel.select({ separator: " " });
	}

	static onPrepareFrom(_) {
		_.storage.selectSessionQuery = squel.select({ separator: " " });
	}

	static onPrepareFields(_) {
		_.storage.selectSessionQuery.from("session", "s");
	}

	static onPrepareWhereCredentials(_) {
		_.storage.selectSessionQuery.where("s.secret_token = ?", _.headers.authorization);
	}

	static async onQueryForSession(_) {
		const sql = _.storage.selectSessionQuery.toString();
		_.storage.selectSessionResult = await _.controller.router.app.db.getConnection().query(sql);
	}

	static onCheckForUser(_) {
		// Redundant check.
	}

	static onCheckForPassword(_) {
		// Redundant check.
	}

	static onCheckForSession(_) {
		if(!_.storage.selectSessionResult.length) {
			throw new ErrorManager.classes.AuthenticationError("SecretTokenNotFound");
		}
	}

	static onPrepareDeleteSessionQuery(_) {
		// Empty is ok.
	}

	static onPrepareDelete(_) {
		_.storage.deleteSessionQuery = squel.delete({ separator: " " });
	}

	static onPrepareDeleteFrom(_) {
		_.storage.deleteSessionQuery.from("session");
	}

	static onPrepareDeleteWhereCredentials(_) {
		_.storage.deleteSessionQuery.where("session.secret_token = ?", _.headers.authorization);
	}

	static async onQueryForSessionDeletion(_) {
		const sql = _.storage.deleteSessionQuery.toString();
		_.storage.deleteSessionResult = await _.controller.router.app.db.getConnection().query(sql);
		_.output.data = _.storage.deleteSessionResult;
	}

	static onRemoveSessionToken(_) {
		if(_.request && _.request.session) {
			delete _.request.session.bearerToken;
		}
	}

	static onResponse(_) {
		_.output.metadata.finished = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		return _.response.sendJsonSuccess(_.output.data, _.output.metadata, _.output.code);
	}


}

module.exports = LogoutController;