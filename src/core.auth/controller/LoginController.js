const moment = require("moment");
const BasicController = require(process.env.PROJECT_ROOT + "/core/controller/BasicController.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const ReflectionManager = require(process.env.PROJECT_ROOT + "/core/helper/ReflectionManager.js");
const ParametersManager = require(process.env.PROJECT_ROOT + "/core/helper/ParametersManager.js");
const CollectionManager = require(process.env.PROJECT_ROOT + "/core/helper/CollectionManager.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");
const dd = require(process.env.PROJECT_ROOT + "/core/helper/dd.js");
const squel = require("squel");
const Sequelize = require("sequelize");

class LoginController extends BasicController {

	constructor(options = {}) {
		super(options);
		this.method = "post";
		this.controller = this.loginCallback.bind(this);
	}

	async loginCallback(request, response, next) {
		return this.constructor.login(new ParametersManager({ controller: this, staticController: this.constructor }, request, response, next, {}));
	}

	static getLoginSteps() {
		return [
			"onPrepareSelectUserQuery",
			"onPrepareSelect",
			"onPrepareFrom",
			"onPrepareFields",
			"onPrepareJoinMembership",
			"onPrepareJoinRole",
			"onPrepareJoinCommunity",
			"onPrepareJoinPermission",
			"onPrepareJoinSession",
			"onPrepareWhereCredentials",
			"~onQueryForUser",
			"onCheckForUser",
			"onCheckForPassword",
			"onCheckForSession",
			"onPrepareInsertSessionQuery",
			"onPrepareInsert",
			"onPrepareInto",
			"onPrepareValues",
			"~onQueryForSession",
			"onResponse",
		];
	}

	static login(_) {
		return ReflectionManager.gateway(this, this.getLoginSteps(), _);
	}

	static onPrepareSelectUserQuery(_) {
		// Empty is ok.
	}

	static onPrepareSelect(_) {
		_.storage.query1 = squel.select({ separator: " " });
	}

	static onPrepareFrom(_) {
		_.storage.query1.from("user", "u");
	}

	static onPrepareFields(_) {
		_.storage.query1.field("u.id", "user id");
		_.storage.query1.field("u.name", "user name");
		_.storage.query1.field("u.password", "user password");
		_.storage.query1.field("u.email", "user email");
		_.storage.query1.field("m.id", "membership id");
		_.storage.query1.field("r.id", "role id");
		_.storage.query1.field("r.name", "role name");
		_.storage.query1.field("c.id", "community id");
		_.storage.query1.field("c.name", "community name");
		_.storage.query1.field("s.id", "session id");
		_.storage.query1.field("s.secret_token", "session secret token");
		_.storage.query1.field("s.recovery_token", "session recovery token");
	}

	static onPrepareJoinMembership(_) {
		_.storage.query1.left_join("membership", "m", "m.id_user = u.id");
	}

	static onPrepareJoinRole(_) {
		_.storage.query1.left_join("role", "r", "r.id = m.id_role");
	}
	
	static onPrepareJoinCommunity(_) {
		_.storage.query1.left_join("community", "c", "c.id = r.id_community");
	}

	static onPrepareJoinPermission(_) {
		_.storage.query1.left_join("permission_per_role", "pr", "pr.id_role = r.id");
		_.storage.query1.left_join("permission", "p", "p.id = pr.id_permission");
	}

	static onPrepareJoinSession(_) {
		_.storage.query1.left_join("session", "s", "s.id_user = u.id");
	}

	static onPrepareWhereCredentials(_) {
		_.storage.query1.where(
			squel.expr().and("u.name = ?", _.input.name).or("u.email = ?", _.input.name)
		);
	}

	static async onQueryForUser(_) {
		_.storage.query1sql = _.storage.query1.toString();
		_.storage.query1result = await _.controller.router.app.db.getConnection().query(_.storage.query1sql, { type: Sequelize.QueryTypes.SELECT});
	}

	static onCheckForUser(_) {
		if(_.storage.query1result.length) {
			_.output.data = Object.assign({}, _.storage.query1result[0]);
			_.output.user = Object.assign({}, _.storage.query1result[0]);
		} else {
			throw new ErrorManager.classes.AuthenticationError("User or email <" + _.input.name + "> not found.");
		}
	}

	static onCheckForPassword(_) {
		return new Promise((resolve, reject) => {
			if(_.output.user["user password"] === _.input.password) {
				return resolve();
			} else {
				const error = new ErrorManager.classes.AuthenticationError("Incorrect password for user or email <" + _.input.name + ">.");
				return reject(error);
			}
		});
	}

	static onCheckForSession(_) {
		if(_.output.user["session id"]) {
			_.output.data["session secret token"] = _.output.user["session secret token"];
			_.output.data["user is already logged in"] = true;
			_.response.sendJsonSuccess(_.output.data);
			_.exit = true;
		}

	}

	static onPrepareInsertSessionQuery(_) {
		// Empty is ok.
	}

	static onPrepareInsert(_) {
		_.storage.query2 = squel.insert({ separator: " " });
	}

	static onPrepareInto(_) {
		_.storage.query2.into("session");
	}

	static onPrepareValues(_) {
		const secretToken = StringUtils.generateSecretToken();
		const recoveryToken = StringUtils.generateSecretToken();
		_.storage.query2.set("id_user", _.output.user["user id"]);
		_.storage.query2.set("secret_token", secretToken);
		_.storage.query2.set("recovery_token", recoveryToken);
		_.output.data.token = secretToken;
		_.output.data.recovery_token = recoveryToken;
	}

	static async onQueryForSession(_) {
		_.storage.query2sql = _.storage.query2.toString();
		_.storage.query2result = await this.router.app.db.getConnection().query(_.storage.query2sql, { type: Sequelize.QueryTypes.INSERT});
	}

	static onResponse(_) {
		_.output.metadata.finished = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		return _.response.sendJsonSuccess(_.output.data, _.output.metadata, _.output.code);
	}

}

module.exports = LoginController;