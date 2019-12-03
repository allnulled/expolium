const RestModelController = require(process.env.PROJECT_ROOT + "/core/controller/RestModelController.js");
const User = require(process.env.PROJECT_ROOT + "/core/model/rest/db/User.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");

class BaseUserController extends RestModelController {
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
