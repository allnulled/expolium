const path = require("path");
const moment = require("moment");
const Sequelize = require("sequelize");
const squel = require("squel");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");
const CollectionManager = require(process.env.PROJECT_ROOT + "/core/helper/CollectionManager.js");
const CheckManager = require(process.env.PROJECT_ROOT + "/core/helper/CheckManager.js");
const BasicController = require(__dirname + "/BasicController.js");
const { that } = new CheckManager();

class ModelController extends BasicController {

	static get model() {
		throw new ErrorManager.classes.MustOverrideError("ModelController.model");
	}

	static get path() {
		throw new ErrorManager.classes.MustOverrideError("ModelController.path");
	}

	static get name() {
		throw new ErrorManager.classes.MustOverrideError("ModelController.name");
	}

	static get defaultPaginationLimit() {
		return 20;
	}

	static get defaultInstanceValues() {
		return {
			// @TODO: set default values for current item
		};
	}

	mountOnRouter(router) {
		// get schema:
		router.$router.get(StringUtils.joinUrl(this.path, "@"), this.middleware, this.dispatchSchema.bind(this), this.fail.bind(this));
		// get one:
		router.$router.get(StringUtils.joinUrl(this.path, ":id"), this.middleware, this.dispatchGetOne.bind(this), this.fail.bind(this));
		// get many:
		router.$router.get(StringUtils.joinUrl(this.path), this.middleware, this.dispatchGetMany.bind(this), this.fail.bind(this));
		// post one:
		router.$router.post(StringUtils.joinUrl(this.path), this.middleware, this.dispatchPostOne.bind(this), this.fail.bind(this));
		// put one:
		router.$router.put(StringUtils.joinUrl(this.path, ":id"), this.middleware, this.dispatchPutOne.bind(this), this.fail.bind(this));
		// delete one:
		router.$router.delete(StringUtils.joinUrl(this.path, ":id"), this.middleware, this.dispatchDeleteOne.bind(this), this.fail.bind(this));
	}

	////////////////////////////////////////////////////////////

	constructor(options = {}) {
		super(options);
		this.path = this.constructor.path;
		if(typeof options !== "object")
			throw new ErrorManager.classes.RequiredTypeError("object");
		Object.keys(options).forEach(prop => this[prop] = options[prop]);
	}
	
	////////////////////////////////////////////////////////////

	onRespond(options) {
		options.output.metadata["finished"] = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		if(options.isResponse) {
			return options.response.sendJsonSuccess(options.output.data, options.output.metadata, options.output.code);
		}
	}

	onError(options, error) {
		options.output.metadata["finished"] = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		options.output.error = error;
		if(options.isResponse) {
			if(process.env.NODE_ENV === "development") {
				Object.keys(ErrorManager.classes).forEach(className => {
					const errorClass = ErrorManager.classes[className];
					if(options.output.error instanceof errorClass) {
						return options.response.sendJsonError(options.output.error, options.output.metadata, options.output.error.httpCode || 500);
					}
				});
				return options.response.sendJsonError("Request failed. Please, contact the technician.", options.output.metadata, options.output.error.httpCode || 500);
			} else {
				return options.response.sendJsonError(options.output.error, options.output.metadata, options.output.error.httpCode || 500);
			}
		}
	}

	async dispatchThread(method, options) {
		try {
			return await this[method](options);
		} catch(error) {
			return this.onError(options, error);
		}
	}

	dispatchSchema(...args) {
		return this.dispatchThread("schema", {...this.adaptSchemaParameters(...args), isResponse: true, request: args[0], response: args[1], next: args[2]});
	}

	dispatchGetOne(...args) {
		return this.dispatchThread("getOne", {...this.adaptGetOneParameters(...args), isResponse: true, request: args[0], response: args[1], next: args[2]});
	}

	dispatchGetMany(...args) {
		return this.dispatchThread("getMany", {...this.adaptGetManyParameters(...args), isResponse: true, request: args[0], response: args[1], next: args[2]});
	}

	dispatchPostOne(...args) {
		return this.dispatchThread("postOne", {...this.adaptPostOneParameters(...args), isResponse: true, request: args[0], response: args[1], next: args[2]});
	}

	dispatchPutOne(...args) {
		return this.dispatchThread("putOne", {...this.adaptPutOneParameters(...args), isResponse: true, request: args[0], response: args[1], next: args[2]});
	}

	dispatchDeleteOne(...args) {
		return this.dispatchThread("deleteOne", {...this.adaptDeleteOneParameters(...args), isResponse: true, request: args[0], response: args[1], next: args[2]});
	}

	////////////////////////////////////////////////////////////

	adaptSchemaParameters(request, response, next) {
		return {
			input: {
				__method: "GET",
				__operation: "see schema",
				...Object.assign({}, this.constructor.defaultInstanceValues, request.params || {}, request.body || {})
			},
			storage: {},
			output: {
				data: undefined, //the model schema
				metadata: {
					model: this.constructor.model.definition.name,
					method: "GET",
					operation: "get schema",
					started: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
					finished: undefined,
				},
				code: 200
			}
		}
	}

	adaptGetOneParameters(request, response, next) {
		return {
			input: {
				__method: "GET",
				__operation: "get one",
				__id: request.params.id,
				fields: request.query.fields || "*",
				joins: request.query.joins || [],
				...Object.assign({}, this.constructor.defaultInstanceValues, request.params || {}, request.body || {})
			},
			storage: {},
			output: {
				data: undefined,
				metadata: {
					model: this.constructor.model.definition.name,
					method: "GET",
					operation: "get one",
					started: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
					finished: undefined,
				},
				code: 200
			}
		};
	}

	adaptGetManyParameters(request, response, next) {
		return {
			input: {
				__method: "GET",
				__operation: "get many",
				fields: request.query.fields || "*",
				page: request.query.page || 0,
				limit: request.query.limit || this.constructor.defaultPaginationLimit,
				order: request.query.order || [],
				joins: request.query.joins || [],
				where: request.query.where || {},
				...Object.assign({}, this.constructor.defaultInstanceValues, request.params || {}, request.body || {})
			},
			storage: {},
			output: {
				data: undefined,
				metadata: {
					model: this.constructor.model.definition.name,
					method: "GET",
					operation: "get many",
					started: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
					finished: undefined,
				},
				code: 200
			}
		};
	}

	adaptPostOneParameters(request, response, next) {
		const columnNames = Object.keys(this.constructor.model.definition.columns);
		return {
			input: {
				__method: "POST",
				__operation: "post one",
				...Object.assign({}, this.constructor.defaultInstanceValues, request.params || {}, request.body || {})
			},
			storage: {},
			output: {
				data: undefined,
				metadata: {
					model: this.constructor.model.definition.name,
					method: "POST",
					operation: "post one",
					started: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
					finished: undefined,
				},
				code: 200
			}
		};
	}

	adaptPutOneParameters(request, response, next) {
		const columnNames = Object.keys(this.constructor.model.definition.columns);
		return {
			input: {
				__method: "PUT",
				__operation: "put one",
				__id: request.params.id,
				...Object.assign({}, this.constructor.defaultInstanceValues, request.params || {}, request.body || {})
			},
			storage: {},
			output: {
				data: undefined,
				metadata: {
					model: this.constructor.model.definition.name,
					method: "PUT",
					operation: "put one",
					started: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
					finished: undefined,
				},
				code: 200
			}
		};
	}

	adaptDeleteOneParameters(request, response, next) {
		return {
			input: {
				__method: "DELETE",
				__operation: "delete one",
				__id: request.params.id,
			},
			storage: {},
			output: {
				data: undefined,
				metadata: {
					model: this.constructor.model.definition.name,
					method: "DELETE",
					operation: "delete one",
					started: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
					finished: undefined,
				},
				code: 200
			}
		};
	}

	////////////////////////////////////////////////////////////

	async schema(options = {}) {
		this.onStartRestOperation(options);
		this.onAuthorizeSchemaMethod(options);
		this.onPrejobsSchema(options);
		this.onQuerySchema(options);
		this.onTransformSchema(options);
		this.onPostjobsSchema(options);
		if(options.isResponse) {
			this.onRespond(options);
		}
		this.onEndRestOperation(options);
	}

	async getOne(options = {}) {
		this.onStartRestOperation(options);
		this.onAuthorizeGetOneMethod(options);
		this.onAdaptGetOneParameters(options);
		this.onValidateGetOneParameters(options);
		this.onPrejobsGetOne(options);
		this.onPrepareSelect(options);
		this.onPrepareFrom(options);
		this.onPrepareJoinForPermissionBinding(options);
		this.onPrepareJoinForCommunityBinding(options);
		this.onPrepareJoinForParameters(options);
		this.onPrepareWhereForPermissionBinding(options);
		this.onPrepareWhereForCommunityBinding(options);
		this.onPrepareWhereForId(options);
		// this.onPrepareLimitForOne(options);
		this.onPrepare(options);
		this.onQueryBefore(options);
		await this.onQueryGetOne(options);
		this.onQueryAfter(options);
		this.onTransformGetOne(options);
		this.onPostjobsGetOne(options);
		if(options.isResponse) {
			this.onRespond(options);
		}
		this.onEndRestOperation(options);
	}

	async getMany(options = {}) {
		this.onStartRestOperation(options);
		this.onAuthorizeGetManyMethod(options);
		this.onAdaptGetManyParameters(options);
		this.onValidateGetManyParameters(options);
		this.onPrejobsGetMany(options);
		this.onPrepareSelect(options);
		this.onPrepareFrom(options);
		this.onPrepareJoinForPermissionBinding(options);
		this.onPrepareJoinForCommunityBinding(options);
		this.onPrepareJoinForParameters(options);
		this.onPrepareWhereForPermissionBinding(options);
		this.onPrepareWhereForCommunityBinding(options);
		this.onPrepareWhereForParameters(options);
		this.onPrepareSort(options);
		this.onPrepareGroup(options);
		this.onPrepareLimitForPagination(options);
		this.onQueryBefore(options);
		await this.onQueryGetMany(options);
		this.onQueryAfter(options);
		this.onTransformGetMany(options);
		this.onPostjobsGetMany(options);
		if(options.isResponse) {
			this.onRespond(options);
		}
		this.onEndRestOperation(options);
	}

	async postOne(options = {}) {
		this.onStartRestOperation(options);
		this.onAuthorizePostOneMethod(options);
		this.onAdaptPostOneParameters(options);
		this.onValidatePostOneParameters(options);
		this.onPrejobsPostOne(options);
		this.onPrepareInsert(options);
		this.onPrepareInto(options);
		this.onPrepareSetFields(options)
		this.onQueryBefore(options);
		await this.onQueryInsertOne(options);
		this.onQueryAfter(options);
		this.onTransformPostOne(options);
		this.onPostjobsPostOne(options);
		if(options.isResponse) {
			this.onRespond(options);
		}
		this.onEndRestOperation(options);
	}

	async putOne(options = {}) {
		this.onStartRestOperation(options);
		this.onAuthorizePutOneMethod(options);
		this.onAdaptPutOneParameters(options);
		this.onValidatePutOneParameters(options);
		this.onPrejobsPutOne(options);
		this.onPrepareUpdate(options);
		this.onPrepareTable(options);
		this.onPrepareSetFields(options)
		this.onPrepareJoinForPermissionBinding(options);
		this.onPrepareJoinForCommunityBinding(options);
		this.onPrepareJoinForParameters(options);
		this.onPrepareWhereForPermissionBinding(options);
		this.onPrepareWhereForCommunityBinding(options);
		this.onPrepareWhereForId(options);
		this.onPrepareSort(options);
		this.onPrepareGroup(options);
		this.onPrepareLimitForOne(options);
		this.onQueryForItem(options);
		this.onQueryBefore(options);
		await this.onQueryUpdateOne(options);
		this.onQueryAfter(options);
		this.onTransformPutOne(options);
		this.onPostjobsPutOne(options);
		if(options.isResponse) {
			this.onRespond(options);
		}
		this.onEndRestOperation(options);
	}

	async deleteOne(options = {}) {
		this.onStartRestOperation(options);
		this.onAuthorizeDeleteOneMethod(options);
		this.onAdaptDeleteOneParameters(options);
		this.onValidateDeleteOneParameters(options);
		this.onPrejobsDeleteOne(options);
		this.onPrepareDelete(options);
		this.onPrepareFrom(options);
		this.onPrepareJoinForPermissionBinding(options);
		this.onPrepareJoinForCommunityBinding(options);
		this.onPrepareJoinForParameters(options);
		this.onPrepareWhereForPermissionBinding(options);
		this.onPrepareWhereForCommunityBinding(options);
		this.onPrepareWhereForId(options);
		this.onPrepareSort(options);
		this.onPrepareGroup(options);
		this.onPrepareLimitForOne(options);
		this.onQueryForItem(options);
		this.onPrepareSetFields(options);
		this.onQueryBefore(options);
		await this.onQueryDeleteOne(options);
		this.onQueryAfter(options);
		this.onTransformDeleteOne(options);
		this.onPostjobsDeleteOne(options);
		if(options.isResponse) {
			this.onRespond(options);
		}
		this.onEndRestOperation(options);
	}

	////////////////////////////////////////////////////////////

	isValidParameterByType(parameterType, parameter) {
		return false;
	}

	////////////////////////////////////////////////////////////

	onStartRestOperation(options) {
		if(options.isResponse) {
			/*
			const date = ;
			const op = ;
			const ip = options.input._request.header('x-forwarded-for') || options.input._request.connection.remoteAddress;
			console.log(`[${moment().format("YYYY/MM/DD HH:mm:ss.SSS")}][To ${options.input.__operation]`)
			//*/
		}
	}
	
	onAuthorize(options) {}

	onAuthorizeSchemaMethod(options) {}
	
	onAuthorizeGetManyMethod(options) {}
	
	onAuthorizeGetOneMethod(options) {}
	
	onAuthorizePostOneMethod(options) {}
	
	onAuthorizePutOneMethod(options) {}
	
	onAuthorizeDeleteOneMethod(options) {}
	
	onAdapt(options) {}
	
	onAdaptGetManyParameters(options) {}
	
	onAdaptGetOneParameters(options) {}
	
	onAdaptPostOneParameters(options) {}
	
	onAdaptPutOneParameters(options) {}
	
	onAdaptDeleteOneParameters(options) {}
	
	onValidate(state) {}

	onValidateSchemaParameters(options) {
		throw new Error("Method validateSchemaParameters should be overriden, if any");
	}

	onValidateGetOneParameters(options) {
		const columns = this.constructor.model.definition.columns;
		// @TODO: check that all parameters are valid.
		//throw new Error("Not valid parameter");
	}

	onValidateGetManyParameters(options) {
		const { input } = options;
		const columns = this.constructor.model.definition.columns;
		// @TODO: check that all parameters are valid.
		//throw new Error("Not valid parameter");
	}

	onValidatePostOneParameters(options) {
		const { input } = options;
		const columns = this.constructor.model.definition.columns;
		// @TODO: check that all parameters are valid.
		//throw new Error("Not valid parameter");
	}

	onValidatePutOneParameters(options) {
		const { input } = options;
		const columns = this.constructor.model.definition.columns;
		// @TODO: check that all parameters are valid.
		//throw new Error("Not valid parameter");
	}

	onValidateDeleteOneParameters(options) {
		const { input } = options;
		const columns = this.constructor.model.definition.columns;
		// @TODO: check that all parameters are valid.
		//throw new Error("Not valid parameter");
	}
	
	onPrejobs(options) {}
	
	onPrejobsSchema(options) {}
	
	onPrejobsGetOne(options) {}
	
	onPrejobsGetMany(options) {}
	
	onPrejobsPostOne(options) {}
	
	onPrejobsPutOne(options) {}
	
	onPrejobsDeleteOne(options) {}
	
	onPrepare(options) {}
	
	onPrepareSelect(options) {
		options.storage.query = squel.select({ separator: "\n" });
	}

	////////////////////////////////////////////////////

	onPrepareInsert(options) {
		options.storage.query = squel.insert({ separator: "\n" });
	}

	onPrepareInto(options) {
		options.storage.query.into(this.constructor.model.definition.table);
	}
	
	onPrepareSetFields(options) {
		if(typeof options.input === "object") {
			for(let prop in options.input) {
				if(!prop.startsWith("__")) {
					options.storage.query.set(prop, options.input[prop]);
				}
			}
		}
	}

	////////////////////////////////////////////////////

	onPrepareUpdate(options) {
		options.storage.query = squel.update({ separator: "\n" });
	}
	
	onPrepareTable(options) {
		options.storage.query.table(this.constructor.model.definition.table);
	}

	onPrepareDelete(options) {
		options.storage.query = squel.delete({ separator: "\n" });	
	}
	
	onPrepareFrom(options) {
		options.storage.query.from(this.constructor.model.definition.table);
	}
	
	onPrepareJoin(options) {}
	
	onPrepareJoinForPermissionBinding(options) {}
	
	onPrepareJoinForCommunityBinding(options) {}
	
	onPrepareJoinForParameters(options) {}
	
	onPrepareWhere(options) {}
	
	onPrepareWhereForPermissionBinding(options) {}
	
	onPrepareWhereForCommunityBinding(options) {}
	
	onPrepareWhereForParameters(options) {}

	onPrepareWhereForId(options) {
		options.storage.query.where("id = ?", options.input.__id);
	}
	
	onPrepareSort(options) {}
	
	onPrepareGroup(options) {}
	
	onPrepareLimitForOne(options) {
		options.storage.query.limit(1);
	}

	onPrepareLimitForPagination(options) {}

	onQueryForItem(options) {}
	
	onQuery(options) {}
	
	onQueryBefore(options) {
		options.output.data = {};
	}
	
	onQuerySchema(options) {
		options.output.data = {
			path: this.path,
			table: this.constructor.model.definition.table,
			model: this.constructor.model.definition.name,
			columns: this.constructor.model.definition.getPublicColumns(),
			relations: this.constructor.model.definition.allRelationships,
		};
	}
	
	async onQueryGetOne(options) {
		const sql = options.storage.query.toString();
		options.output.dataBrute = await this.router.app.db.getConnection().query(sql, { type: Sequelize.QueryTypes.SELECT });
		if(options.output.dataBrute && options.output.dataBrute.length) {
			options.output.data = options.output.dataBrute[0];
		} else {
			options.output.data = null;
		}
	}
	
	async onQueryGetMany(options) {
		return this.onSelectQueryExecution(options);
	}
	
	async onQueryInsertOne(options) {
		return await this.onStandardQueryExecution(options);
	}
	
	async onQueryUpdateOne(options) {
		return await this.onStandardQueryExecution(options);
	}
	
	async onQueryDeleteOne(options) {
		return await this.onStandardQueryExecution(options);
	}

	async onSelectQueryExecution(options) {
		const sql = options.storage.query.toString();
		options.output.data = await this.router.app.db.getConnection().query(sql, { type: Sequelize.QueryTypes.SELECT });
	}

	async onStandardQueryExecution(options) {
		const sql = options.storage.query.toString();
		options.output.data = await this.router.app.db.getConnection().query(sql);
	}
	
	onQueryAfter(options) {}
	
	onTransform(options) {}
	
	onTransformSchema(options) {}
	
	onTransformGetOne(options) {}
	
	onTransformGetMany(options) {}
	
	onTransformPostOne(options) {}
	
	onTransformPutOne(options) {}
	
	onTransformDeleteOne(options) {}
	
	onPostjobs(options) {}
	
	onPostjobsSchema(options) {}
	
	onPostjobsGetOne(options) {}
	
	onPostjobsGetMany(options) {}
	
	onPostjobsPostOne(options) {}
	
	onPostjobsPutOne(options) {}
	
	onPostjobsDeleteOne(options) {}
	
	onEndRestOperation(options) {}

	onHandleError(options, error) {
		this.router.app.logger.error(error);
		console.log(error);
	}

}

module.exports = ModelController;