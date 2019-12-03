const Session = require(process.env.PROJECT_ROOT + "/core.rest/db/model/Session.js");
const User = require(process.env.PROJECT_ROOT + "/core.rest/db/model/User.js");
const Role = require(process.env.PROJECT_ROOT + "/core.rest/db/model/Role.js");
const Community = require(process.env.PROJECT_ROOT + "/core.rest/db/model/Community.js");
const Membership = require(process.env.PROJECT_ROOT + "/core.rest/db/model/Membership.js");
const Permission = require(process.env.PROJECT_ROOT + "/core.rest/db/model/Permission.js");
const PermissionPerRole = require(process.env.PROJECT_ROOT + "/core.rest/db/model/PermissionPerRole.js");

class AuthenticationManager {

	static get models() {
		return {
			user: User,
			role: Role,
			community: Community,
			permissionPerRole: PermissionPerRole,
			permission: Permission,
			session: Session,
		}
	}

	static getBearerToken(_) {
		let bearerToken = undefined;
		if (_.request.headers.authorization) {
			bearerToken = _.request.headers.authorization;
		} else if (_.request.session && _.request.session.bearerToken) {
			bearerToken = _.request.session.bearerToken;
		}
		if (!bearerToken) {
			//
		} else {
			bearerToken = bearerToken.replace(/Bearer /g, "");
			_.request.session.bearerToken = bearerToken;
		}
		return bearerToken;
	}

}

module.exports = AuthenticationManager;