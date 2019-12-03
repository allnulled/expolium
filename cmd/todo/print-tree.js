const path = require("path");
const tree = require("tree-node-cli");
const string = tree(path.resolve(__dirname + "/.."), {
	exclude: [/node_modules/]
});

console.log(string);