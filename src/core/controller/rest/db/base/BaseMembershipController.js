const RestModelController = require(process.env.PROJECT_ROOT + "/core/controller/RestModelController.js");
const Membership = require(process.env.PROJECT_ROOT + "/core/model/rest/db/Membership.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");

class BaseMembershipController extends RestModelController {
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
