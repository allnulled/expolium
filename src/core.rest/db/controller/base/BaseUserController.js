const ModelController = require(process.env.PROJECT_ROOT + "/core/controller/ModelController.js");
const User = require(process.env.PROJECT_ROOT + "/core.rest/db/model/User.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");

class BaseUserController extends ModelController {
    static get model() {
        return User;
    }

    static get name() {
        return "User";
    }

    static get path() {
        return "user";
    }
}

module.exports = BaseUserController;
