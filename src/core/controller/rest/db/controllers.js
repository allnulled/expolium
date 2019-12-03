const fs = require("fs");
const controllerNames = fs.readdirSync(__dirname + "/controller");
const controllers = {};

controllerNames.forEach(controllerName => {
	const controller = require(__dirname + "/controller/" + controllerName);
	controllers[controllerName] = controller;
});

module.exports = controllers;