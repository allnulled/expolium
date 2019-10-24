const ModelController = require(process.env.PROJECT_ROOT + "/core/controller/ModelController.js");
const Session = require(process.env.PROJECT_ROOT + "/core.rest/db/model/Session.js");

class BaseSessionController extends ModelController {
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
