const fs = require("fs");
const modelNames = fs.readdirSync(__dirname + "/model");
const models = {};

modelNames.forEach(modelName => {
	const model = require(__dirname + "/model/" + modelName);
	models[modelName] = model;
});

module.exports = models;