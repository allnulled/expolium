const RestModelController = require(process.env.PROJECT_ROOT + "/core/controller/RestModelController.js");
const Permission = require(process.env.PROJECT_ROOT + "/core/model/rest/db/Permission.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");

class BasePermissionController extends RestModelController {
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
