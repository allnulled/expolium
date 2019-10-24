const BasicMiddleware = require(process.env.PROJECT_ROOT + "/core/middleware/BasicMiddleware.js");

class PermittedMiddleware extends BasicMiddleware {

}

module.exports = PermittedMiddleware;