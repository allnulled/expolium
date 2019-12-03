const RestModelController = require(process.env.PROJECT_ROOT + "/core/controller/RestModelController.js");
const Community = require(process.env.PROJECT_ROOT + "/core/model/rest/db/Community.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");

class BaseCommunityController extends RestModelController {
    static get model() {
        return Community;
    }

    static get name() {
        return "Community";
    }

    static get path() {
        return "community";
    }
}

module.exports = BaseCommunityController;
