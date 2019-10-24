const config = require(__dirname + "/../expolium.config.js");
const args = Object.assign({}, require("yargs").argv, config);

process.env.NODE_ENV = args.environment;
process.env.PROJECT_ROOT = require("path").resolve(__dirname);
process.env.PROJECT_NAME = args.project;
process.env.PROJECT_PATH = args.project + "/project/Project.js";

require("dotenv").config({path: __dirname + "/../.env." + process.env.NODE_ENV });
