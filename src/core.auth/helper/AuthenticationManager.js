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

}

module.exports = AuthenticationManager;