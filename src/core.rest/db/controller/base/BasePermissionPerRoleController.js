const ModelController = require(process.env.PROJECT_ROOT + "/core/controller/ModelController.js");
const PermissionPerRole = require(process.env.PROJECT_ROOT + "/core.rest/db/model/PermissionPerRole.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");

class BasePermissionPerRoleController extends ModelController {
    static get model() {
        return PermissionPerRole;
    }

    static get name() {
        return "PermissionPerRole";
    }

    static get path() {
        return "permission-per-role";
    }
}

module.exports = BasePermissionPerRoleController;
