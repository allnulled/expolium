const moment = require("moment");
const BasicController = require(process.env.PROJECT_ROOT + "/core/controller/BasicController.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const ReflectionManager = require(process.env.PROJECT_ROOT + "/core/helper/ReflectionManager.js");
const ParametersManager = require(process.env.PROJECT_ROOT + "/core/helper/ParametersManager.js");
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

	loginCallback(request, response, next) {
		return this.constructor.login(new ParametersManager({
			controller: this,
			controllerClass: this.constructor,
			request: request,
			response: response,
			next: next,
		}));
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
			"onSetSessionToken",
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
		_.storage.queryForUser = squel.select({ separator: " " });
	}

	static onPrepareFrom(_) {
		_.storage.queryForUser.from("user", "u");
	}

	static onPrepareFields(_) {
		_.storage.queryForUser.field("u.id", "user id");
		_.storage.queryForUser.field("u.name", "user name");
		_.storage.queryForUser.field("u.password", "user password");
		_.storage.queryForUser.field("u.email", "user email");
		_.storage.queryForUser.field("m.id", "membership id");
		_.storage.queryForUser.field("r.id", "role id");
		_.storage.queryForUser.field("r.name", "role name");
		_.storage.queryForUser.field("c.id", "community id");
		_.storage.queryForUser.field("c.name", "community name");
		_.storage.queryForUser.field("s.id", "session id");
		_.storage.queryForUser.field("s.secret_token", "session secret token");
		_.storage.queryForUser.field("s.recovery_token", "session recovery token");
	}

	static onPrepareJoinMembership(_) {
		_.storage.queryForUser.left_join("membership", "m", "m.id_user = u.id");
	}

	static onPrepareJoinRole(_) {
		_.storage.queryForUser.left_join("role", "r", "r.id = m.id_role");
	}
	
	static onPrepareJoinCommunity(_) {
		_.storage.queryForUser.left_join("community", "c", "c.id = r.id_community");
	}

	static onPrepareJoinPermission(_) {
		_.storage.queryForUser.left_join("permission_per_role", "pr", "pr.id_role = r.id");
		_.storage.queryForUser.left_join("permission", "p", "p.id = pr.id_permission");
	}

	static onPrepareJoinSession(_) {
		_.storage.queryForUser.left_join("session", "s", "s.id_user = u.id");
	}

	static onPrepareWhereCredentials(_) {
		_.storage.queryForUser.where(
			squel.expr().and("u.name = ?", _.input.name).or("u.email = ?", _.input.name)
		);
	}

	static async onQueryForUser(_) {
		_.storage.queryForUserSQL = _.storage.queryForUser.toString();
		_.storage.queryForUserResult = await _.controller.router.app.db.getConnection().query(_.storage.queryForUserSQL, { type: Sequelize.QueryTypes.SELECT});
	}

	static onCheckForUser(_) {
		if(_.storage.queryForUserResult.length) {
			_.output.data = Object.assign({}, _.storage.queryForUserResult[0]);
			_.output.user = Object.assign({}, _.storage.queryForUserResult[0]);
		} else {
			throw new ErrorManager.classes.AuthenticationError("User or email <" + _.input.name + "> not found.");
		}
	}

	static onCheckForPassword(_) {
		return new Promise((resolve, reject) => {
			if(_.output.user["user password"] === _.input.password) {
				return resolve();
			} else {
				const error = new ErrorManager.classes.AuthenticationError("Incorrect password for user name or email <" + _.input.name + ">.");
				return reject(error);
			}
		});
	}

	static onCheckForSession(_) {
		if(_.output.user["session id"]) {
			_.output.data["session secret token"] = _.output.user["session secret token"];
			_.output.data["user is already logged in"] = true;
			if(_.response) {
				if(_.request.body.__redirect_success) {
					_.exit = true;
					return _.response.redirect(_.request.body.__redirect_success);
				} else {
					_.exit = true;
					return _.response.sendJsonSuccess(_.output.data);
				}
			}
		}

	}

	static onPrepareInsertSessionQuery(_) {
		// Empty is ok.
	}

	static onPrepareInsert(_) {
		_.storage.queryForSession = squel.insert({ separator: " " });
	}

	static onPrepareInto(_) {
		_.storage.queryForSession.into("session");
	}

	static onPrepareValues(_) {
		const secretToken = StringUtils.generateSecretToken();
		const recoveryToken = StringUtils.generateSecretToken();
		_.storage.queryForSession.set("id_user", _.output.user["user id"]);
		_.storage.queryForSession.set("secret_token", secretToken);
		_.storage.queryForSession.set("recovery_token", recoveryToken);
		_.output.data.token = secretToken;
		_.output.data.recovery_token = recoveryToken;
	}

	static async onQueryForSession(_) {
		_.storage.queryForSessionSQL = _.storage.queryForSession.toString();
		_.storage.queryForSessionResult = await _.controller.router.app.db.getConnection().query(_.storage.queryForSessionSQL, { type: Sequelize.QueryTypes.INSERT});
	}

	static onSetSessionToken(_) {
		if(_.request && _.request.session) {
			console.log("Saving session");
			_.request.session.bearerToken = _.output.data.token;
			_.request.session.data = _.output.data;
			_.request.session.save();
		} else {
			console.log("Not saving session");
		}
	}

	static onRedirect(_) {
		if(_.request && _.response) {
			if(_.request.body.__redirect_success) {
				_.exit = true;
				return _.response.redirect(_.body.__redirect_success);
			}
		}
	}

	static onResponse(_) {
		_.output.metadata.finished = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		if(_.response) {
			return _.response.sendJsonSuccess(_.output.data, _.output.metadata, _.output.code);
		}
	}

}

module.exports = LoginController;