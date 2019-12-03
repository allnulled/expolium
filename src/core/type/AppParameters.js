const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const DefaultParameters = require(__dirname + "/DefaultParameters.js");

class AppParameters extends DefaultParameters {

};

module.exports = AppParameters;