const RestModelController = require(process.env.PROJECT_ROOT + "/core/controller/RestModelController.js");
const Ejemplos = require(process.env.PROJECT_ROOT + "/core/model/rest/db/Ejemplos.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");

class BaseEjemplosController extends RestModelController {
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
