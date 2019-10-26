const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");

module.exports = (parameters, data) => {
	const text = StringUtils.stringify(data);
	parameters.exit = true;
	try {
		parameters.response.json(JSON.parse(text)).send();
	} catch(error) {
		parameters.response.json(text).send();
	}
};