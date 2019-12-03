const RestModelController = require(process.env.PROJECT_ROOT + "/core/controller/RestModelController.js");
const PermissionPerRole = require(process.env.PROJECT_ROOT + "/core/model/rest/db/PermissionPerRole.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");

class BasePermissionPerRoleController extends RestModelController {
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
