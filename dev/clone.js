const fs = require("fs-extra");
const path = require("path");
const args = require("yargs").argv;

if(!(0 in args._)) {
	throw new Error("You must provide the output directory: npm run clone -- output/directory");
}

const arg = args._[0];
const origin = path.resolve(__dirname + "/..");
const destine = path.resolve(arg);

console.log("(*) Copying:");
console.log("    - Origin: " + origin);
console.log("    - Destine: " + destine);

fs.copySync(origin, destine);

console.log("(*) Successfully copyied.");
