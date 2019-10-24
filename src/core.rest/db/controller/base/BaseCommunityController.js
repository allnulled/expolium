const ModelController = require(process.env.PROJECT_ROOT + "/core/controller/ModelController.js");
const Community = require(process.env.PROJECT_ROOT + "/core.rest/db/model/Community.js");

class BaseCommunityController extends ModelController {
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
