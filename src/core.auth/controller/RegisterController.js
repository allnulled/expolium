const moment = require("moment");
const BasicController = require(process.env.PROJECT_ROOT + "/core/controller/BasicController.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const ParametersManager = require(process.env.PROJECT_ROOT + "/core/helper/ParametersManager.js");
const CollectionManager = require(process.env.PROJECT_ROOT + "/core/helper/CollectionManager.js");
const User = require(process.env.PROJECT_ROOT + "/core.rest/db/model/User.js");
const squel = require("squel");
const Sequelize = require("sequelize");

class RegisterController extends BasicController {

	onResponse(_) {
		_.output.metadata.finished = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		return _.response.sendJsonSuccess(_.output.data, _.output.metadata, _.output.code);
	}

	onPrepareSelectUserQuery(_) {
		// Stating point only
	}

	onPrepareSelect(_) {
		_.storage.query1 = squel.select({ separator: " " });
	}

	onPrepareFrom(_) {
		_.storage.query1.from("user", "u");
	}

	onPrepareFields(_) {
		// nothing will mean everything for squel
	}

	onPrepareJoinMembership(_) {
		_.storage.query1.left_join("membership", "m", "m.id_user = u.id");
	}

	onPrepareJoinRole(_) {
		_.storage.query1.left_join("role", "r", "r.id = m.id_role");
	}
	
	onPrepareJoinCommunity(_) {
		_.storage.query1.left_join("community", "c", "c.id = r.id_community");
	}

	onPrepareJoinPermission(_) {
		_.storage.query1.left_join("permission_per_role", "pr", "pr.id_role = r.id");
		_.storage.query1.left_join("permission", "p", "p.id = pr.id_permission");
	}

	onPrepareWhereCredentials(_) {
		_.storage.query1.where(
			squel.expr().and("u.name = ?", _.input.name).or("u.email = ?", _.input.name)
		);
	}

	async onSelectForUser(_) {
		_.storage.query1sql = _.storage.query1.toString();
		_.storage.query1result = await this.router.app.db.getConnection().query(_.storage.query1sql, { type: Sequelize.QueryTypes.SELECT });
	}

	onCheckForUser(_) {
		if(_.storage.query1result.length) {
			throw new ErrorManager.classes.AuthenticationError("User or email <" + _.input.name + "> already exists.");
		}
	}

	onPrepareSanitizeInput(_) {
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

	onPrepareInsertUserQuery(_) {
		// Stating point only
	}

	onPrepareInsert(_) {
		_.storage.query2 = squel.insert({ separator: " " });
	}

	onPrepareInto(_) {
		_.storage.query2.into("user");
	}

	onPrepareValues(_) {
		const validColumns = User.definition.getPublicColumnNames();
		const columns = CollectionManager.getOnlyKeys(_.input, validColumns);
		Object.keys(columns).forEach(name => {
			const column = columns[name];
			_.storage.query2.set(name, column);
		});
	}

	async onInsertForUser(_) {
		_.storage.query2sql = _.storage.query2.toString();
		_.storage.query2result = await this.router.app.db.getConnection().query(_.storage.query2sql);
	}

	async registerCallback(request, response, next) {
		const _ = new ParametersManager({}, request, response, next);
		try {
			// @PartOne: Retrieve user by name/email. If it exists, return error.
			this.onPrepareSelectUserQuery(_);
			if(_.exit) {return _.exit;}
			this.onPrepareSelect(_);
			if(_.exit) {return _.exit;}
			this.onPrepareFrom(_);
			if(_.exit) {return _.exit;}
			this.onPrepareFields(_);
			if(_.exit) {return _.exit;}
			this.onPrepareJoinMembership(_);
			if(_.exit) {return _.exit;}
			this.onPrepareJoinRole(_);
			if(_.exit) {return _.exit;}
			this.onPrepareJoinCommunity(_);
			if(_.exit) {return _.exit;}
			this.onPrepareJoinPermission(_);
			if(_.exit) {return _.exit;}
			this.onPrepareWhereCredentials(_);
			if(_.exit) {return _.exit;}
			await this.onSelectForUser(_);
			if(_.exit) {return _.exit;}
			this.onCheckForUser(_);
			if(_.exit) {return _.exit;}
			// @PartTwo: Insert new session with generated token.
			this.onPrepareSanitizeInput(_);
			if(_.exit) {return _.exit;}
			this.onPrepareInsertUserQuery(_);
			if(_.exit) {return _.exit;}
			this.onPrepareInsert(_);
			if(_.exit) {return _.exit;}
			this.onPrepareInto(_);
			if(_.exit) {return _.exit;}
			this.onPrepareValues(_);
			if(_.exit) {return _.exit;}
			await this.onInsertForUser(_);
			if(_.exit) {return _.exit;}
			// @PartThree: Respond to the user.
			this.onResponse(_);
		} catch(error) {
			console.log(error);
			return _.response.sendJsonError(error);
		}
	}

	constructor(options = {}) {
		super(options);
		this.method = "post";
		this.controller = this.registerCallback.bind(this);
	}

}

module.exports = RegisterController;