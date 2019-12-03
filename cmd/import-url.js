const path = require("path");
const argv = require("yargs").argv;
const download = require("download");
const isValid = argv.from && argv.to;

if(!isValid) {
	throw new Error("Needs --from and --to parameters");
}

const src = argv.from;
const dst = path.resolve(argv.to);

download(src, path.dirname(dst), {filename: path.basename(dst)}).then(i => {
	console.log("Successfull operation. ", i);
	if(global.PROJECT) 
		global.PROJECT.app.closeAll();
}).catch(error => {
	console.log("Error: ", error);
	if(global.PROJECT) 
		global.PROJECT.app.closeAll();
});