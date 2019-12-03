const env = require(__dirname + "/env.js");
const Runner = require(__dirname + "/" + process.env.PROJECT_NAME + "/runner/Runner.js");
const runner = new Runner();

module.exports = runner.start().then(() => {
	console.log("Project <" + process.env.PROJECT_NAME + "> was started.");
	return runner;
}).catch(error => {
	console.log("Error starting project:", error);
	throw error;
});