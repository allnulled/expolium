const env = require(__dirname + "/env.js");
const Runner = require(__dirname + "/" + process.env.PROJECT_NAME + "/runner/Runner.js");
const runner = new Runner();

module.exports = runner.load().then(() => {
	console.log("Project <" + process.env.PROJECT_NAME + "> was loaded.");
	return runner;
}).catch(error => {
	console.log("Error loading project:", error);
	throw error;
});