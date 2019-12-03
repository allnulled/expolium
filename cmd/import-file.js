const path = require("path");
const argv = require("yargs").argv;
const fs = require("fs-extra");
const isValid = argv.from && argv.to;

if(!isValid) {
	throw new Error("Needs --from and --to parameters");
}

const src = argv.from;
const dst = path.resolve(argv.to);

fs.copySync(src, dst);


if(global.PROJECT) 
	global.PROJECT.app.closeAll();
