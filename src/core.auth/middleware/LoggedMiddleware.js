const squel = require("squel");
const Sequelize = require("sequelize");
const BasicMiddleware = require(process.env.PROJECT_ROOT + "/core/middleware/BasicMiddleware.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");
const ParametersManager = require(process.env.PROJECT_ROOT + "/core/helper/ParametersManager.js");
const CollectionManager = require(process.env.PROJECT_ROOT + "/core/helper/CollectionManager.js");
const AuthenticationManager = require(process.env.PROJECT_ROOT + "/core/helper/AuthenticationManager.js");

class LoggedMiddleware extends BasicMiddleware {

	static loggedCallback(request, response, next, middleware) {
		return middleware.constructor.logged(new ParametersManager({
			middleware: middleware,
			middlewareClass: middleware.constructor,
			request: request,
			response: response,
			next: next,
		}));
	}

	static async logged(_) {
		try {
			this.onCheckAlreadyLogged(_);
			if(_.exit) return;
			this.onGetBearerToken(_);
			this.onPrepareSessionQuery(_);
			this.onPrepareSelect(_);
			this.onPrepareFrom(_);
			this.onPrepareFields(_);
			this.onPrepareJoinUser(_);
			this.onPrepareJoinMembership(_);
			this.onPrepareJoinRole(_);
			this.onPrepareJoinCommunity(_);
			this.onPrepareJoinPermission(_);
			this.onPrepareWhereCredentials(_);
			await this.onQueryForSession(_);
			this.onAuthenticateToken(_);
			this.onGroupResults(_);
			return _.next();
		} catch(error) {
			console.log(error);
			return _.response.sendJsonError(error, {}, 500);
		}
	}

	static onCheckAlreadyLogged(_) {
		if(typeof _.request.expolium.auth !== "undefined") {
			_.exit = true;
		}
	}

	static onGetBearerToken(_) {
		_.storage.bearerToken = undefined;
		if(_.request.headers.authorization) {
			_.storage.bearerToken = _.request.headers.authorization;
		} else if(_.request.session && _.request.session.bearerToken) {
			_.storage.bearerToken = _.request.session.bearerToken;
		}
		if(!_.storage.bearerToken) {
			throw new ErrorManager.classes.AuthenticationError("SecretTokenNotSet", "Could not find secret token in http authorization header.");
		}
		_.storage.bearerToken = _.storage.bearerToken.replace(/Bearer /g,"");
	}

	static onPrepareSessionQuery(_) {
		// Empty is ok.
	}

	static onPrepareSelect(_) {
		_.storage.sessionQuery = squel.select({ separator: " " });
	}

	static onPrepareFrom(_) {
		_.storage.sessionQuery.from("session", "s");
	}

	static onPrepareFields(_) {
		_.storage.sessionQuery.field("u.id", "user.id");
		_.storage.sessionQuery.field("u.name", "user.name");
		_.storage.sessionQuery.field("u.password", "user.password");
		_.storage.sessionQuery.field("u.email", "user.email");
		_.storage.sessionQuery.field("m.id", "membership.id");
		_.storage.sessionQuery.field("r.id", "role.id");
		_.storage.sessionQuery.field("r.name", "role.name");
		_.storage.sessionQuery.field("c.id", "community.id");
		_.storage.sessionQuery.field("c.name", "community.name");
		_.storage.sessionQuery.field("s.id", "session.id");
		_.storage.sessionQuery.field("s.secret_token", "session.secret_token");
		_.storage.sessionQuery.field("s.recovery_token", "session.recovery_token");
		_.storage.sessionQuery.field("p.id", "permission.id");
		_.storage.sessionQuery.field("p.name", "permission.name");
	}

	static onPrepareJoinUser(_) {
		_.storage.sessionQuery.left_join("user", "u", "s.id_user = u.id");
	}

	static onPrepareJoinMembership(_) {
		_.storage.sessionQuery.left_join("membership", "m", "m.id_user = u.id");
	}

	static onPrepareJoinRole(_) {
		_.storage.sessionQuery.left_join("role", "r", "r.id = m.id_role");
	}
	
	static onPrepareJoinCommunity(_) {
		_.storage.sessionQuery.left_join("community", "c", "c.id = r.id_community");
	}

	static onPrepareJoinPermission(_) {
		_.storage.sessionQuery.left_join("permission_per_role", "pr", "pr.id_role = r.id");
		_.storage.sessionQuery.left_join("permission", "p", "p.id = pr.id_permission");
	}

	static onPrepareWhereCredentials(_) {
		_.storage.sessionQuery.where("s.secret_token = ?", _.storage.bearerToken);
	}

	static async onQueryForSession(_) {
		try {
			const sql = _.storage.sessionQuery.toString();
			_.storage.sessionResult = await _.middleware.router.app.db.getConnection().query(sql, { type: Sequelize.QueryTypes.SELECT});
		} catch(error) {
			console.log(error);
			throw error;	
		}
	}

	static onAuthenticateToken(_) {
		if(!_.storage.sessionResult.length) {
			throw new ErrorManager.classes.AuthenticationError("SecretTokenNotMatched", "Could not find the provided secret token as active session.");
		}
	}

	static onGroupResults(_) {
		_.storage.authData = CollectionManager.groupRawBy(_.storage.sessionResult, "community.id", "permission.id");
		_.request.expolium.auth = {data:_.storage.authData};
	}

	constructor(options = {}, ...others) {
		super(options, ...others);
		const midd = this;
		this.middleware = function(request, response, next) {
			return midd.constructor.loggedCallback.call(this, request, response, next, midd, midd.constructor);
		};
	}

}

module.exports = LoggedMiddleware;