const glob = require("glob");
const files = glob.sync(__dirname + "/**/*Test.js")
const iterate = async (files) => {
	const runner = await require(__dirname + "/../../src/start.js");
	for(let file of files) {
		console.log("Adding test from file: " + file);
		await require(file)(runner);
	}
	run();
}
iterate(files);