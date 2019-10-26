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
			"onPrepareJoinMembership",
			"onPrepareJoinRole",
			"onPrepareJoinCommunity",
			"onPrepareJoinPermission",
			"onPrepareJoinSession",
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
			"onResponse",
		];
	}

	logoutCallback(request, response, next) {
		return this.constructor.logout(new ParametersManager({}, request, response, next));
	}

	static logout(_) {
		return ReflectionManager.gateway(this, this.getLogoutSteps(), _);
	}

	static onPrepareSelectSessionQuery(_) {
		// 
	}

	static onPrepareSelect(_) {
		// 
	}

	static onPrepareFrom(_) {
		// 
	}

	static onPrepareFields(_) {
		// 
	}

	static onPrepareJoinMembership(_) {
		// 
	}

	static onPrepareJoinRole(_) {
		// 
	}

	static onPrepareJoinCommunity(_) {
		// 
	}

	static onPrepareJoinPermission(_) {
		// 
	}

	static onPrepareJoinSession(_) {
		// 
	}

	static onPrepareWhereCredentials(_) {
		// 
	}

	static onQueryForSession(_) {
		// 
	}

	static onCheckForUser(_) {
		// 
	}

	static onCheckForPassword(_) {
		// 
	}

	static onCheckForSession(_) {
		// 
	}

	static onPrepareDeleteSessionQuery(_) {
		// 
	}

	static onPrepareDelete(_) {
		// 
	}

	static onPrepareDeleteFrom(_) {
		// 
	}

	static onPrepareDeleteWhereCredentials(_) {
		// 
	}

	static onQueryForSessionDeletion(_) {
		// 
	}

	static onResponse(_) {
		_.output.metadata.finished = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		return _.response.sendJsonSuccess(_.request.expolium.auth, _.output.metadata, _.output.code);
	}


}

module.exports = LogoutController;