const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");

module.exports = (parameters, data) => {
	const text = StringUtils.stringify(data);
	parameters.exit = true;
	parameters.response.json(JSON.parse(text)).send();
};