const ModelController = require(process.env.PROJECT_ROOT + "/core/controller/ModelController.js");
const Permission = require(process.env.PROJECT_ROOT + "/core.rest/db/model/Permission.js");

class BasePermissionController extends ModelController {
    static get model() {
        return Permission;
    }

    static get name() {
        return "Permission";
    }

    static get path() {
        return "permission";
    }
}

module.exports = BasePermissionController;
