const ModelController = require(process.env.PROJECT_ROOT + "/core/controller/ModelController.js");
const Ejemplos = require(process.env.PROJECT_ROOT + "/core.rest/db/model/Ejemplos.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");

class BaseEjemplosController extends ModelController {
    static get model() {
        return Ejemplos;
    }

    static get name() {
        return "Ejemplos";
    }

    static get path() {
        return "ejemplos";
    }
}

module.exports = BaseEjemplosController;
