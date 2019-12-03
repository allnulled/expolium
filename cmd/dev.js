const path = require("path");
const exec = require("execute-command-sync");

exec("npm run dev", {
	cwd: path.resolve(__dirname + "/..")
})