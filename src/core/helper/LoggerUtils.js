const { ColorizedLogger } = require("colorized-logger");

module.exports = {

	create(title = "[untitled]", colors = ["yellow", "bold", "underline"], callback = undefined) {
		return new ColorizedLogger(...[title, colors].concat(typeof callback === "function" ? [callback] : []));
	}
	
};