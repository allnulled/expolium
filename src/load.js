require(__dirname + "/env.js");
const path = require("path");

const Project = require(path.resolve(process.env.PROJECT_ROOT, process.env.PROJECT_PATH));
const project = new Project();

module.exports = project.load().then(p => {
	console.log("(*) Project loaded!");
	return p;
});