const BasicMiddleware = require(process.env.PROJECT_ROOT + "/core/middleware/BasicMiddleware.js");

class AuthorizedMiddleware extends BasicMiddleware {

}

module.exports = AuthorizedMiddleware;