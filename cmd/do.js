const path = require("path");
const fs = require("fs");
const argv = require("yargs").argv;
const inquirer = require("inquirer");
const config = require(__dirname + "/do/config.json");

if (config.directCommands.indexOf(argv._[0]) !== -1) {
	return require(path.resolve(__dirname, argv._[0].replace(/[ \:]/g, "-").replace(/\.js$/g, " ") + ".js"));
}

require(__dirname + "/../src/load.js").then(project => {

	global.PROJECT = project;

	if (argv._[0]) {
		return require(path.resolve(__dirname, argv._[0].replace(/[ \:]/g, "-").replace(/\.js$/g, " ") + ".js"));
	}

	let memo = {
		action: undefined
	};

	const files = fs.readdirSync(__dirname);
	const execution = async () => {
		try {
			const result = await inquirer.prompt({
				type: "list",
				name: "do",
				pageSize: 50,
				message: "Select an action for expolium to do for you:",
				transformer: i => i.toUpperCase(),
				choices: [...files.reduce((result, f) => {
					const operation = f.replace("-", " ").replace(/\.js$/g, "");
					const action = operation.split(" ")[0];
					const target = operation.split(" ")[1];
					if (memo.action !== action) {
						result.push(new inquirer.Separator("" + " ".repeat(40 - action.length) + "[ " + action.toUpperCase() + " ]"));
					}
					result.push({
						name: "  · " + operation,
						value: f
					});
					memo.action = action;
					return result;
				}, [])]
			});
			require(path.resolve(__dirname, result.do));
		} catch (error) {
			console.log("ERROR:", error);
		}
	};

	execution();

});