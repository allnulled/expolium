const ModelController = require(process.env.PROJECT_ROOT + "/core/controller/ModelController.js");
const Membership = require(process.env.PROJECT_ROOT + "/core.rest/db/model/Membership.js");

class BaseMembershipController extends ModelController {
    static get model() {
        return Membership;
    }

    static get name() {
        return "Membership";
    }

    static get path() {
        return "membership";
    }
}

module.exports = BaseMembershipController;
