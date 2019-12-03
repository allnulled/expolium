/**************************************************************
Name: create:vue
Description: creates a Vue app on the specified path.
**************************************************************/
const args = require("yargs").argv;
const fs = require("fs");
const path = require("path");
const exec = require("execute-command-sync");

if(!args.app) {
	console.log(args);
	throw new Error("Required --app (string) parameter");
}

if(!args.path) {
	console.log(args);
	throw new Error("Required --path (string) parameter");
}

const destine = path.resolve(args.path);

if(!fs.existsSync(destine)) {
	console.log(args);
	throw new Error("Required --path (string) parameter to reference a valid directory path");
}

const executable = path.resolve(__dirname, "..", "node_modules", ".bin", "vue");

exec(`${JSON.stringify(executable)} create --default ${JSON.stringify(args.app)}`, {
	cwd: destine
});