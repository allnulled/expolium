const fs = require("fs");
const inquirer = require("inquirer");
const files = fs.readdirSync(__dirname);
let memo = {action: undefined};

const execution = async () => {
	try {
		const result = await inquirer.prompt({
			type: "list",
			name: "do",
			pageSize: 50,
			message: "Select an action for expolium to do for you:",
			transformer: i => i.toUpperCase(),
			choices: [...files.reduce((result, f) => {
				const operation = f.replace("-"," ").replace(/\.js$/g, "");
				const action = operation.split(" ")[0];
				const target = operation.split(" ")[1];
				if(memo.action !== action) {
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
		require(__dirname + "/" + result.do);
	} catch(error) {
		console.log("ERROR:", error);
	}
};

execution();