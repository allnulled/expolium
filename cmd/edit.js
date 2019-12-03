const path = require("path");
const exec = require("execute-command-sync");

exec("subl .", {
	cwd: path.resolve(__dirname + "/..")
})