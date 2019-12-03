const RestModelController = require(process.env.PROJECT_ROOT + "/core/controller/RestModelController.js");
const Session = require(process.env.PROJECT_ROOT + "/core/model/rest/db/Session.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");

class BaseSessionController extends RestModelController {
    static get model() {
        return Session;
    }

    static get name() {
        return "Session";
    }

    static get path() {
        return "session";
    }
}

module.exports = BaseSessionController;
