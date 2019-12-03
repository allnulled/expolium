const RestModelController = require(process.env.PROJECT_ROOT + "/core/controller/RestModelController.js");
const Role = require(process.env.PROJECT_ROOT + "/core/model/rest/db/Role.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");

class BaseRoleController extends RestModelController {
    static get model() {
        return Role;
    }

    static get name() {
        return "Role";
    }

    static get path() {
        return "role";
    }
}

module.exports = BaseRoleController;
