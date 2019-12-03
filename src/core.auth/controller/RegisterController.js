const moment = require("moment");
const BasicController = require(process.env.PROJECT_ROOT + "/core/controller/BasicController.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const ParametersManager = require(process.env.PROJECT_ROOT + "/core/helper/ParametersManager.js");
const CollectionManager = require(process.env.PROJECT_ROOT + "/core/helper/CollectionManager.js");
const ReflectionManager = require(process.env.PROJECT_ROOT + "/core/helper/ReflectionManager.js");
const User = require(process.env.PROJECT_ROOT + "/core.rest/db/model/User.js");
const squel = require("squel");
const Sequelize = require("sequelize");

class RegisterController extends BasicController {

	constructor(options = {}) {
		super(options);
		this.method = "post";
		this.controller = this.registerCallback.bind(this);
	}

	static getRegisterSteps() {
		return [
			"onPrepareSanitizeInput",
			"onPrepareInsertUserQuery",
			"onPrepareInsert",
			"onPrepareInto",
			"onPrepareValues",
			"~onInsertForUser",
			"onResponse",
		];
	}

	registerCallback(request, response, next) {
		return this.constructor.register(new ParametersManager({
			controller: this,
			controllerClass: this.constructor,
			request: request,
			response: response,
			next: next,
		}));
	}

	static register(_) {
		return ReflectionManager.gateway(this, this.getRegisterSteps(), _);
	}

	static onPrepareSanitizeInput(_) {
		if(_.input.name) {
			if(_.input.name.indexOf("@") !== -1) {
				throw new ErrorManager.classes.ValidationError("Parameter 'name' can only contain letters and numbers");
			}
		}
		if(_.input.password) {
			if(_.input.password.length < 6) {
				throw new ErrorManager.classes.ValidationError("Parameter 'password' must contain more than 6 characters");
			}
		}
	}

	static onPrepareInsertUserQuery(_) {
		// Stating point only
	}

	static onPrepareInsert(_) {
		_.storage.insertUser = squel.insert({ separator: " " });
	}

	static onPrepareInto(_) {
		_.storage.insertUser.into("user");
	}

	static onPrepareValues(_) {
		const validColumns = User.definition.getPublicColumnNames();
		const columns = CollectionManager.getOnlyKeys(_.input, validColumns);
		Object.keys(columns).forEach(name => {
			const column = columns[name];
			_.storage.insertUser.set(name, column);
		});
	}

	static async onInsertForUser(_) {
		const sql = _.storage.insertUser.toString();
		try {
			_.storage.insertUserResult = await _.controller.router.app.db.getConnection().query(sql);
		} catch(error) {
			_.exit = true;
			_.response.sendJsonError(error);
			return console.log(error);
		}
		_.output.data = _.storage.insertUserResult;
	}

	static onResponse(_) {
		_.output.metadata.finished = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		return _.response.sendJsonSuccess(_.output.data, _.output.metadata, _.output.code);
	}

}

module.exports = RegisterController;