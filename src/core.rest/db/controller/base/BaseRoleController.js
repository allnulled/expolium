const ModelController = require(process.env.PROJECT_ROOT + "/core/controller/ModelController.js");
const Role = require(process.env.PROJECT_ROOT + "/core.rest/db/model/Role.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");

class BaseRoleController extends ModelController {
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
