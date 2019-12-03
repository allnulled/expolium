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

class UnregisterController extends BasicController {

	constructor(options = {}) {
		super(options);
		this.method = "post";
		this.controller = this.unregisterCallback.bind(this);
	}

	static getUnregisterSteps() {
		return [
			"onPrepareDeleteUserQuery",
			"onPrepareDelete",
			"onPrepareDeleteFrom",
			"onPrepareDeleteWhereCredentials",
			"~onQueryForUserDeletion",
			"onResponse",
		];
	}

	unregisterCallback(request, response, next) {
		return this.constructor.unregister(new ParametersManager({ 
			headers: request.headers, 
			controller: this, 
			controllerClass: this.constructor,
		}, request, response, next));
	}

	static unregister(_) {
		return ReflectionManager.gateway(this, this.getUnregisterSteps(), _);
	}

	static onPrepareDeleteUserQuery(_) {
		// Empty is ok.
	}

	static onPrepareDelete(_) {
		_.storage.deleteUserQuery = squel.delete({ separator: " " });
	}

	static onPrepareDeleteFrom(_) {
		_.storage.deleteUserQuery.from("session");
	}

	static onPrepareDeleteWhereCredentials(_) {
		_.storage.deleteUserQuery.where("session.secret_token = ?", _.headers.authorization);
	}

	static async onQueryForUserDeletion(_) {
		const sql = _.storage.deleteUserQuery.toString();
		_.storage.deleteUserResult = await _.controller.router.app.db.getConnection().query(sql);
		_.output.data = _.storage.deleteUserResult;
	}

	static onResponse(_) {
		_.output.metadata.finished = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		return _.response.sendJsonSuccess(_.output.data, _.output.metadata, _.output.code);
	}

}

module.exports = UnregisterController;