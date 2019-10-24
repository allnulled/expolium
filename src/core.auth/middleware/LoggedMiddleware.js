const BasicMiddleware = require(process.env.PROJECT_ROOT + "/core/middleware/BasicMiddleware.js");

class LoggedMiddleware extends BasicMiddleware {

}

module.exports = LoggedMiddleware;