const moment = require("moment");
const BasicController = require(process.env.PROJECT_ROOT + "/core/controller/BasicController.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const ParametersManager = require(process.env.PROJECT_ROOT + "/core/helper/ParametersManager.js");
const CollectionManager = require(process.env.PROJECT_ROOT + "/core/helper/CollectionManager.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");
const dd = require(process.env.PROJECT_ROOT + "/core/helper/dd.js");
const Session = require(process.env.PROJECT_ROOT + "/core.rest/db/model/Session.js");
const User = require(process.env.PROJECT_ROOT + "/core.rest/db/model/User.js");
const Role = require(process.env.PROJECT_ROOT + "/core.rest/db/model/Role.js");
const Community = require(process.env.PROJECT_ROOT + "/core.rest/db/model/Community.js");
const Membership = require(process.env.PROJECT_ROOT + "/core.rest/db/model/Membership.js");
const Permission = require(process.env.PROJECT_ROOT + "/core.rest/db/model/Permission.js");
const PermissionPerRole = require(process.env.PROJECT_ROOT + "/core.rest/db/model/PermissionPerRole.js");
const squel = require("squel");
const Sequelize = require("sequelize");

class LoginController extends BasicController {

	static get selectedModels() {
		return {
			user: User,
			role: Role,
			community: Community,
			permission: Permission,
			permissionPerRole: PermissionPerRole,
		}
	}

	onResponse(_) {
		_.output.metadata.finished = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		return _.response.sendJsonSuccess(_.output.data, _.output.metadata, _.output.code);
	}

	onPrepareSelectUserQuery(_) {
	}

	onPrepareSelect(_) {
		_.storage.query1 = squel.select({ separator: " " });
	}

	onPrepareFrom(_) {
		_.storage.query1.from("user", "u");
	}

	onPrepareFields(_) {
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

	onPrepareJoinMembership(_) {
		_.storage.query1.left_join("membership", "m", "m.id_user = u.id");
	}

	onPrepareJoinRole(_) {
		_.storage.query1.left_join("role", "r", "r.id = m.id_role");
	}
	
	onPrepareJoinCommunity(_) {
		_.storage.query1.left_join("community", "c", "c.id = r.id_community");
	}

	onPrepareJoinPermission(_) {
		_.storage.query1.left_join("permission_per_role", "pr", "pr.id_role = r.id");
		_.storage.query1.left_join("permission", "p", "p.id = pr.id_permission");
	}

	onPrepareJoinSession(_) {
		_.storage.query1.left_join("session", "s", "s.id_user = u.id");
	}

	onPrepareWhereCredentials(_) {
		_.storage.query1.where(
			squel.expr().and("u.name = ?", _.input.name).or("u.email = ?", _.input.name)
		);
	}

	async onQueryForUser(_) {
		_.storage.query1sql = _.storage.query1.toString();
		_.storage.query1result = await this.router.app.db.getConnection().query(_.storage.query1sql, { type: Sequelize.QueryTypes.SELECT});
	}

	onCheckForUser(_) {
		if(_.storage.query1result.length) {
		_.output.data = Object.assign({}, _.storage.query1result[0]);
		_.output.user = Object.assign({}, _.storage.query1result[0]);
		} else {
			throw new ErrorManager.classes.AuthenticationError("User or email <" + _.input.name + "> not found.");
		}
	}

	onCheckForPassword(_) {
		return new Promise((resolve, reject) => {
			if(_.output.user["user password"] === _.input.password) {
				return resolve();
			} else {
				const error = new ErrorManager.classes.AuthenticationError("Incorrect password for user or email <" + _.input.name + ">.");
				return reject(error);
			}
		});
	}

	onCheckForSession(_) {
		if(_.output.user["session id"]) {
			_.output.data["session secret token"] = _.output.user["session secret token"];
			_.output.data["user is already logged in"] = true;
			_.response.sendJsonSuccess(_.output.data);
		}

	}

	onPrepareInsertSessionQuery(_) {

	}

	onPrepareInsert(_) {
		_.storage.query2 = squel.insert({ separator: " " });
	}

	onPrepareInto(_) {
		_.storage.query2.into("session");
	}

	onPrepareValues(_) {
		const secretToken = StringUtils.generateSecretToken();
		const recoveryToken = StringUtils.generateSecretToken();
		_.storage.query2.set("id_user", _.output.user["user id"]);
		_.storage.query2.set("secret_token", secretToken);
		_.storage.query2.set("recovery_token", recoveryToken);
		_.output.data.token = secretToken;
		_.output.data.recovery_token = recoveryToken;
	}

	async onQueryForSession(_) {
		_.storage.query2sql = _.storage.query2.toString();
		_.storage.query2result = await this.router.app.db.getConnection().query(_.storage.query2sql, { type: Sequelize.QueryTypes.INSERT});
	}

	async loginCallback(request, response, next) {
		const _ = new ParametersManager({}, request, response, next);
		try {
			// @PartOne: Retrieve user by name/email. 
			// If not, return an error of usernotfound.
			// Then check the password. 
			this.onPrepareSelectUserQuery(_);
			if(_.exit) {return;}
			this.onPrepareSelect(_);
			if(_.exit) {return;}
			this.onPrepareFrom(_);
			if(_.exit) {return;}
			this.onPrepareFields(_);
			if(_.exit) {return;}
			this.onPrepareJoinMembership(_);
			if(_.exit) {return;}
			this.onPrepareJoinRole(_);
			if(_.exit) {return;}
			this.onPrepareJoinCommunity(_);
			if(_.exit) {return;}
			this.onPrepareJoinPermission(_);
			if(_.exit) {return;}
			this.onPrepareJoinSession(_);
			if(_.exit) {return;}
			this.onPrepareWhereCredentials(_);
			if(_.exit) {return;}
			await this.onQueryForUser(_);
			if(_.exit) {return;}
			this.onCheckForUser(_);
			if(_.exit) {return;}
			await this.onCheckForPassword(_);
			if(_.exit) {return;}
			this.onCheckForSession(_);
			if(_.exit) {return;}
			// @PartTwo: Insert new session with generated token.
			this.onPrepareInsertSessionQuery(_);
			if(_.exit) {return;}
			this.onPrepareInsert(_);
			if(_.exit) {return;}
			this.onPrepareInto(_);
			if(_.exit) {return;}
			this.onPrepareValues(_);
			if(_.exit) {return;}
			await this.onQueryForSession(_);
			if(_.exit) {return;}
			// @PartThree: Respond to the user.
			this.onResponse(_);
		} catch(error) {
			console.log(error);
			return _.response.sendJsonError(error);
		}
	}

	constructor(options = {}) {
		super(options);
		this.method = "post";
		this.controller = this.loginCallback.bind(this);
	}

}

module.exports = LoginController;