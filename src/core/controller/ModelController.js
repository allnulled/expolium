const path = require("path");
const moment = require("moment");
const Sequelize = require("sequelize");
const squel = require("squel");
const ejs = require("ejs");
const dotProp = require("dot-prop");
const es6TemplateString = require("es6-template-strings/resolve-to-string");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/error/ErrorManager.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");
const ParametersManager = require(process.env.PROJECT_ROOT + "/core/helper/ParametersManager.js");
const LoggerManager = require(process.env.PROJECT_ROOT + "/core/helper/LoggerManager.js");
const Logger = LoggerManager.create({
	source: __filename
});
const CollectionManager = require(process.env.PROJECT_ROOT + "/core/helper/CollectionManager.js");
const CheckManager = require(process.env.PROJECT_ROOT + "/core/helper/CheckManager.js");
const BasicController = require(__dirname + "/BasicController.js");
const Models = require(process.env.PROJECT_ROOT + "/core.rest/db/models.js");
const {
	that
} = new CheckManager();

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
	static get acceptedOperators() {
		return ["=", "!=", "<", "<=", ">", ">=", "like", "not like", "in", "not in"];
	}

	static onTranslateTableColumnExpression(expression) {
		if (typeof expression === "string" && expression.startsWith("~.")) {
			return this.model.definition.table + expression.substr(1);
		}
		return expression;
	}

	get methodsVisibility() {
		return {
			getSchema: true,
			getOne: true,
			getMany: true,
			postOne: true,
			putOne: true,
			deleteOne: true,
			viewMany: true,
			viewOne: true,
			addOne: true,
			editOne: true,
		};
	}

	get templateParameters() {
		return {
			StringUtils,
			moment,
			CheckManager,
			CollectionManager
		}
	}

	get templateSources() {
		return {
			viewMany: process.env.PROJECT_ROOT + "/core/template/rest/viewMany.ejs",
			viewOne: process.env.PROJECT_ROOT + "/core/template/rest/viewOne.ejs",
			addOne: process.env.PROJECT_ROOT + "/core/template/rest/addOne.ejs",
			editOne: process.env.PROJECT_ROOT + "/core/template/rest/editOne.ejs",
		};
	}

	mountOnRouter(router) {
		// /@/view/:id
		if (this.methodsVisibility.viewOne) {
			router.$router.get(StringUtils.joinUrl(this.path, "@", "view", ":id"), this.middleware, this.dispatchViewOne.bind(this));
		}
		// /@/add
		if (this.methodsVisibility.addOne) {
			router.$router.get(StringUtils.joinUrl(this.path, "@", "add"), this.middleware, this.dispatchAddOne.bind(this));
		}
		// /@/edit/:id
		if (this.methodsVisibility.editOne) {
			router.$router.get(StringUtils.joinUrl(this.path, "@", "edit", ":id"), this.middleware, this.dispatchEditOne.bind(this));
		}
		// /@/view many:
		if (this.methodsVisibility.viewMany) {
			router.$router.get(StringUtils.joinUrl(this.path, "@", "view"), this.middleware, this.dispatchViewMany.bind(this));
		}
		// @:
		if (this.methodsVisibility.getSchema) {
			router.$router.get(StringUtils.joinUrl(this.path, "@"), this.middleware, this.dispatchSchema.bind(this));
		}
		// get one:
		if (this.methodsVisibility.getOne) {
			router.$router.get(StringUtils.joinUrl(this.path, ":id"), this.middleware, this.dispatchGetOne.bind(this));
		}
		// get many:
		if (this.methodsVisibility.getMany) {
			router.$router.get(StringUtils.joinUrl(this.path), this.middleware, this.dispatchGetMany.bind(this));
		}
		// post one:
		if (this.methodsVisibility.postOne) {
			router.$router.post(StringUtils.joinUrl(this.path), this.middleware, this.dispatchPostOne.bind(this));
		}
		// put one:
		if (this.methodsVisibility.putOne) {
			router.$router.put(StringUtils.joinUrl(this.path, ":id"), this.middleware, this.dispatchPutOne.bind(this));
		}
		// delete one:
		if (this.methodsVisibility.deleteOne) {
			router.$router.delete(StringUtils.joinUrl(this.path, ":id"), this.middleware, this.dispatchDeleteOne.bind(this));
		}
	}

	////////////////////////////////////////////////////////////

	constructor(_ = {}) {
		super(_);
		this.path = this.constructor.path;
		if (typeof _ !== "object")
			throw new ErrorManager.classes.RequiredTypeError("object");
		Object.keys(_).forEach(prop => this[prop] = _[prop]);
	}

	////////////////////////////////////////////////////////////

	adaptSchemaParameters(request, response, next) {
		return new ParametersManager({
			controller: this,
			controllerClass: this.constructor,
			request: request,
			response: response,
			next: next,
			input: {
				__method: "GET",
				__operation: "get schema",
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
		});
	}

	adaptGetOneParameters(request, response, next) {
		return new ParametersManager({
			controller: this,
			controllerClass: this.constructor,
			request: request,
			response: response,
			next: next,
			input: {
				__method: "GET",
				__operation: "get one",
				__id: request.params.id,
				fields: request.query.fields || undefined,
				joins: request.query.joins || undefined
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
		});
	}

	adaptGetManyParameters(request, response, next) {
		return new ParametersManager({
			controller: this,
			controllerClass: this.constructor,
			request: request,
			response: response,
			next: next,
			input: {
				__method: "GET",
				__operation: "get many",
				fields: request.query.fields || undefined, //meh.........
				page: request.query.page || 0,
				limit: request.query.limit || this.constructor.defaultPaginationLimit,
				sort: request.query.sort || undefined,
				joins: request.query.joins || undefined, //meh.........
				where: request.query.where || undefined,
				group: request.query.group || undefined,
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
					pagination: {
						page: undefined,
						limit: undefined,
						totalOf: {
							pages: undefined,
							items: undefined,
						}
					}
				},
				code: 200
			}
		});
	}

	adaptPostOneParameters(request, response, next) {
		return new ParametersManager({
			controller: this,
			controllerClass: this.constructor,
			request: request,
			response: response,
			next: next,
			input: {
				__method: "POST",
				__operation: "post one",
				...this.constructor.defaultInstanceValues
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
		});
	}

	adaptPutOneParameters(request, response, next) {
		return new ParametersManager({
			controller: this,
			controllerClass: this.constructor,
			request: request,
			response: response,
			next: next,
			input: {
				__method: "PUT",
				__operation: "put one",
				__id: request.params.id,
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
		});
	}

	adaptDeleteOneParameters(request, response, next) {
		return new ParametersManager({
			controller: this,
			controllerClass: this.constructor,
			request: request,
			response: response,
			next: next,
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
		});
	}

	adaptViewManyParameters(request, response, next) {
		return new ParametersManager({
			controller: this,
			controllerClass: this.constructor,
			request: request,
			response: response,
			next: next,
			input: {
				__method: "GET",
				__operation: "view many",
				__id: request.params.id,
			},
			storage: {},
			output: {
				data: undefined,
				metadata: {
					model: this.constructor.model.definition.name,
					method: "GET",
					operation: "view many",
					started: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
					finished: undefined,
					tags: {},
				},
				code: 200
			}
		});
	}

	adaptViewOneParameters(request, response, next) {
		return new ParametersManager({
			controller: this,
			controllerClass: this.constructor,
			request: request,
			response: response,
			next: next,
			input: {
				__method: "GET",
				__operation: "view one",
				__id: request.params.id
			},
			storage: {},
			output: {
				data: undefined,
				metadata: {
					model: this.constructor.model.definition.name,
					method: "GET",
					operation: "view one",
					started: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
					finished: undefined,
					tags: {},
				},
				code: 200
			}
		});
	}

	adaptAddOneParameters(request, response, next) {
		return new ParametersManager({
			controller: this,
			controllerClass: this.constructor,
			request: request,
			response: response,
			next: next,
			input: {
				__method: "GET",
				__operation: "add one",
				__id: request.params.id,
			},
			storage: {},
			output: {
				data: undefined,
				metadata: {
					model: this.constructor.model.definition.name,
					method: "GET",
					operation: "add one",
					started: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
					finished: undefined,
					tags: {},
				},
				code: 200
			}
		});
	}

	adaptEditOneParameters(request, response, next) {
		return new ParametersManager({
			controller: this,
			controllerClass: this.constructor,
			request: request,
			response: response,
			next: next,
			input: {
				__method: "GET",
				__operation: "edit one",
				__id: request.params.id,
			},
			storage: {},
			output: {
				data: undefined,
				metadata: {
					model: this.constructor.model.definition.name,
					method: "GET",
					operation: "edit one",
					started: moment().format("YYYY/MM/DD HH:mm:ss.SSS"),
					finished: undefined,
					tags: {},
				},
				code: 200
			}
		});
	}


	////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////////

	onRespond(_) {
		_.output.metadata["finished"] = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		if (_.response) {
			if (_.response.headersSent) {
				return;
			}
			return _.response.sendJsonSuccess(_.output.data, _.output.metadata, _.output.code);
		}
	}

	onRespondHtml(_) {
		_.output.metadata["finished"] = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		if (_.response) {
			if (_.request.query.as === "template") {
				if (_.response.headersSent) {
					return;
				}
				return _.response.sendTextSuccess(_.output.data, _.output.metadata, _.output.code);
			} else {
				if (_.response.headersSent) {
					return;
				}
				return _.response.sendHtmlSuccess(_.output.data, _.output.metadata, _.output.code);
			}
		}
	}

	onError(_, error) {
		_.output.metadata["finished"] = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		_.output.error = error;
		console.log(error);
		if (_.response) {
			if (process.env.NODE_ENV === "development") {
				Object.keys(ErrorManager.classes).forEach(className => {
					const errorClass = ErrorManager.classes[className];
					if (_.output.error instanceof errorClass) {
						if (_.response.headersSent) {
							return;
						}
						return _.response.sendJsonError(_.output.error, _.output.metadata, _.output.error.httpCode || 500);
					}
				});
				if (_.response.headersSent) {
					return;
				}
			} else {
				if (_.response.headersSent) {
					return;
				}
				return _.response.sendJsonError("Request failed. Please, contact the technician.", _.output.metadata, _.output.error.httpCode || 500);
			}
		}
	}

	dispatchSchema(request, response, next) {
		return this.schema(this.adaptSchemaParameters(request, response, next));
	}

	dispatchGetOne(request, response, next) {
		return this.getOne(this.adaptGetOneParameters(request, response, next));
	}

	dispatchGetMany(request, response, next) {
		return this.getMany(this.adaptGetManyParameters(request, response, next));
	}

	dispatchPostOne(request, response, next) {
		return this.postOne(this.adaptPostOneParameters(request, response, next));
	}

	dispatchPutOne(request, response, next) {
		return this.putOne(this.adaptPutOneParameters(request, response, next));
	}

	dispatchDeleteOne(request, response, next) {
		return this.deleteOne(this.adaptDeleteOneParameters(request, response, next));
	}

	dispatchViewMany(request, response, next) {
		return this.viewMany(this.adaptViewManyParameters(request, response, next));
	}

	dispatchViewOne(request, response, next) {
		return this.viewOne(this.adaptViewOneParameters(request, response, next));
	}

	dispatchAddOne(request, response, next) {
		return this.addOne(this.adaptAddOneParameters(request, response, next));
	}

	dispatchEditOne(request, response, next) {
		return this.editOne(this.adaptEditOneParameters(request, response, next));
	}

	async schema(_ = {}) {
		try {
			this.onStartRestOperation(_); //
			this.onAuthorizeSchemaMethod(_); //
			this.onPrejobsSchema(_); //
			this.onQuerySchema(_); //
			this.onTransformSchema(_); //
			this.onPostjobsSchema(_); //
			this.onRespond(_); //
			this.onEndRestOperation(_); //
			return _.output;
		} catch (error) {
			this.onError(_, error);
		}
	}

	async getOne(_ = {}) {
		try { //
			this.onStartRestOperation(_); //
			this.onAuthorizeGetOneMethod(_); //
			this.onAdaptGetOneParameters(_); //
			this.onValidateGetOneParameters(_); //
			this.onPrejobsGetOne(_); //
			this.onPrepare(_); //
			this.onPrepareSelect(_); //
			this.onPrepareSelectForAttachedModels(_); //
			this.onPrepareFrom(_); //
			this.onPrepareJoinForAttachedModels(_); //
			this.onPrepareJoinForParameters(_); //
			this.onPrepareWhereForCommunityBinding(_); //
			this.onPrepareWhereForId(_);
			// this.onPrepareLimitForOne(_); //
			this.onQueryBefore(_); //
			await this.onQueryGetOne(_); //
			this.onQueryAfter(_); //
			this.onTransformGetOne(_); //
			this.onPostjobsGetOne(_); //
			this.onRespond(_); //
			this.onEndRestOperation(_); //
			return _.output;
		} catch (error) { //
			this.onError(_, error); //
		}
	}

	async getMany(_ = {}) {
		try {
			this.onStartRestOperation(_);
			this.onAuthorizeGetManyMethod(_);
			this.onAdaptGetManyParameters(_);
			this.onValidateGetManyParameters(_);
			this.onPrejobsGetMany(_);
			this.onPrepare(_);
			this.onPrepareSelect(_);
			this.onPrepareFrom(_);
			this.onPrepareJoinForParameters(_);
			this.onPrepareWhereForCommunityBinding(_);
			this.onPrepareWhereForParameters(_);
			this.onPrepareSort(_);
			this.onPrepareGroup(_);
			this.onPrepareLimitForPagination(_);
			this.onPrepareOffsetForPagination(_);
			this.onQueryBefore(_);
			await this.onQueryGetMany(_);
			this.onQueryAfter(_);
			this.onTransformGetMany(_);
			this.onPostjobsGetMany(_);
			this.onRespond(_);
			this.onEndRestOperation(_);
			return _.output;
		} catch (error) {
			this.onError(_, error);
		}
	}

	async postOne(_ = {}) {
		try {
			this.onStartRestOperation(_);
			this.onAuthorizePostOneMethod(_);
			this.onAdaptPostOneParameters(_);
			this.onValidatePostOneParameters(_);
			this.onPrejobsPostOne(_);
			this.onPrepare(_);
			this.onPrepareInsert(_);
			this.onPrepareInto(_);
			this.onPrepareSetFields(_);
			this.onQueryBefore(_);
			await this.onQueryInsertOne(_);
			this.onQueryAfter(_);
			this.onTransformPostOne(_);
			this.onPostjobsPostOne(_);
			this.onRespond(_);
			this.onEndRestOperation(_);
			return _.output;
		} catch (error) {
			this.onError(_, error);
		}
	}

	async putOne(_ = {}) {
		try {
			this.onStartRestOperation(_);
			this.onAuthorizePutOneMethod(_);
			this.onAdaptPutOneParameters(_);
			this.onValidatePutOneParameters(_);
			this.onPrejobsPutOne(_);
			this.onPrepare(_);
			this.onPrepareUpdate(_);
			this.onPrepareTable(_);
			this.onPrepareSetFields(_)
			this.onPrepareJoinForParameters(_);
			this.onPrepareWhereForCommunityBinding(_);
			this.onPrepareWhereForId(_);
			this.onPrepareGroup(_);
			this.onPrepareLimitForOne(_);
			this.onQueryForItem(_);
			this.onQueryBefore(_);
			await this.onQueryUpdateOne(_);
			this.onQueryAfter(_);
			this.onTransformPutOne(_);
			this.onPostjobsPutOne(_);
			this.onRespond(_);
			this.onEndRestOperation(_);
			return _.output;
		} catch (error) {
			this.onError(_, error);
		}
	}

	async deleteOne(_ = {}) {
		try {
			this.onStartRestOperation(_);
			this.onAuthorizeDeleteOneMethod(_);
			this.onAdaptDeleteOneParameters(_);
			this.onValidateDeleteOneParameters(_);
			this.onPrejobsDeleteOne(_);
			this.onPrepare(_);
			this.onPrepareDelete(_);
			this.onPrepareFrom(_);
			this.onPrepareJoinForParameters(_);
			this.onPrepareWhereForCommunityBinding(_);
			this.onPrepareWhereForId(_);
			this.onPrepareGroup(_);
			this.onPrepareLimitForOne(_);
			this.onQueryForItem(_);
			this.onPrepareSetFields(_);
			this.onQueryBefore(_);
			await this.onQueryDeleteOne(_);
			this.onQueryAfter(_);
			this.onTransformDeleteOne(_);
			this.onPostjobsDeleteOne(_);
			this.onRespond(_);
			this.onEndRestOperation(_);
			return _.output;
		} catch (error) {
			this.onError(_, error);
		}
	}

	async viewMany(_ = {}) {
		try {
			this.onStartRestOperation(_);
			this.onAuthorizeViewManyMethod(_);
			this.onAdaptViewManyParameters(_);
			this.onValidateViewManyParameters(_);
			this.onPrejobsViewMany(_);
			this.onBeforeQueryViewMany(_);
			await this.onQueryViewMany(_);
			this.onAfterQueryViewMany(_);
			this.onBeforeRenderViewMany(_);
			await this.onRenderViewMany(_);
			this.onAfterRenderViewMany(_);
			this.onRespondHtml(_);
			this.onEndRestOperation(_);
			return _.output;
		} catch (error) {
			this.onError(_, error);
		}
	}

	async viewOne(_ = {}) {
		try {
			this.onStartRestOperation(_);
			this.onAuthorizeViewOneMethod(_);
			this.onAdaptViewOneParameters(_);
			this.onValidateViewOneParameters(_);
			this.onPrejobsViewOne(_);
			this.onBeforeQueryViewOne(_);
			await this.onQueryViewOne(_);
			this.onAfterQueryViewOne(_);
			this.onBeforeRenderViewOne(_);
			await this.onRenderViewOne(_);
			this.onAfterRenderViewOne(_);
			this.onRespondHtml(_);
			this.onEndRestOperation(_);
			return _.output;
		} catch (error) {
			this.onError(_, error);
		}
	}

	async addOne(_ = {}) {
		try {
			this.onStartRestOperation(_);
			this.onAuthorizeAddOneMethod(_);
			this.onAdaptAddOneParameters(_);
			this.onValidateAddOneParameters(_);
			this.onPrejobsAddOne(_);
			this.onQueryToGetOne(_);
			this.onBeforeRenderAddOne(_);
			await this.onRenderAddOne(_);
			this.onAfterRenderAddOne(_);
			this.onRespondHtml(_);
			this.onEndRestOperation(_);
			return _.output;
		} catch (error) {
			this.onError(_, error);
		}
	}

	async editOne(_ = {}) {
		try {
			this.onStartRestOperation(_);
			this.onAuthorizeEditOneMethod(_);
			this.onAdaptEditOneParameters(_);
			this.onValidateEditOneParameters(_);
			this.onPrejobsEditOne(_);
			this.onBeforeRenderEditOne(_);
			await this.onRenderEditOne(_);
			this.onAfterRenderEditOne(_);
			this.onRespondHtml(_);
			this.onEndRestOperation(_);
			return _.output;
		} catch (error) {
			this.onError(_, error);
		}
	}

	////////////////////////////////////////////////////////////

	onStartRestOperation(_) {}

	onAuthorize(_) {}

	onAuthorizeSchemaMethod(_) {}

	onAuthorizeGetManyMethod(_) {}

	onAuthorizeGetOneMethod(_) {}

	onAuthorizePostOneMethod(_) {}

	onAuthorizePutOneMethod(_) {}

	onAuthorizeDeleteOneMethod(_) {}

	onAuthorizeViewOneMethod(_) {}

	onAdapt(_) {}

	onAdaptGetManyParameters(_) {}

	onAdaptGetOneParameters(_) {}

	onAdaptPostOneParameters(_) {}

	onAdaptPutOneParameters(_) {}

	onAdaptDeleteOneParameters(_) {}

	onAdaptViewOneParameters(_) {}

	onValidate(state) {}

	onValidateSchemaParameters(_) {
		throw new Error("Method validateSchemaParameters should be overriden, if any");
	}

	onValidateGetOneParameters(_) {
		const columns = this.constructor.model.definition.columns;
		// @TODO: check that all parameters are valid.
		//throw new Error("Not valid parameter");
	}

	onValidateGetManyParameters(_) {
		const {
			input
		} = _;
		const columns = this.constructor.model.definition.columns;
		// @TODO: check that all parameters are valid.
		//throw new Error("Not valid parameter");
	}

	onValidatePostOneParameters(_) {
		const {
			input
		} = _;
		const columns = this.constructor.model.definition.columns;
		// @TODO: check that all parameters are valid.
		//throw new Error("Not valid parameter");
	}

	onValidatePutOneParameters(_) {
		const {
			input
		} = _;
		const columns = this.constructor.model.definition.columns;
		// @TODO: check that all parameters are valid.
		//throw new Error("Not valid parameter");
	}

	onValidateDeleteOneParameters(_) {
		const {
			input
		} = _;
		const columns = this.constructor.model.definition.columns;
		// @TODO: check that all parameters are valid.
		//throw new Error("Not valid parameter");
	}

	onValidateViewOneParameters(_) {}

	onPrejobs(_) {}

	onPrejobsSchema(_) {}

	onPrejobsGetOne(_) {}

	onPrejobsGetMany(_) {}

	onPrejobsPostOne(_) {}

	onPrejobsPutOne(_) {}

	onPrejobsDeleteOne(_) {}

	onPrejobsViewOne(_) {}

	onPrepare(_) {}

	onPrepareSelect(_) {
		_.storage.queryMemo = {};
		_.storage.query = squel.select({
			separator: "\n",
			autoQuoteTableNames: true,
			autoQuoteFieldNames: true
		});
		const table = this.constructor.model.definition.table;
		if (_.input.fields) {
			console.log("Customized fields");
			const selectFields = _.input.fields.split(/ *, */g);
			selectFields.forEach(selectField => {
				let [field, label = undefined] = selectField.split(/\@/g);
				field = this.constructor.onTranslateTableColumnExpression(field);
				if (typeof label === "undefined") {
					label = field;
				}
				_.storage.query.field(field, label);
			});
		} else {
			this.constructor.model.definition.getPublicColumnNames().forEach(column => {
				// _.storage.query.field(`${table}.${column}`, `${table}.${column}`);
				_.storage.query.field(`${table}.${column}`, `${column}`);
			});
		}
	}

	onPrepareSelectForAttachedModels(_) {

	}

	static onTransformJoinAttachedModelsParameters(controller, relationRule, tables) {
	}

	onPrepareJoinForAttachedModels(_) {
	}

	////////////////////////////////////////////////////

	onPrepareInsert(_) {
		_.storage.query = squel.insert({
			separator: "\n"
		});
	}

	onPrepareInto(_) {
		_.storage.query.into(this.constructor.model.definition.table);
	}

	onPrepareSetFields(_) {
		console.log(11, _.input);
		for (let prop in _.input) {
			console.log(12);
			const cols = this.constructor.model.definition.getPublicColumns();
			if (Object.keys(cols).indexOf(prop) !== -1) {
				// _.storage.query.set(`${this.constructor.model.definition.table}.${prop}`, _.input[prop]);
				_.storage.query.set(`${prop}`, _.input[prop]);
			}
		}
		console.log(17);
	}

	////////////////////////////////////////////////////

	onPrepareUpdate(_) {
		_.storage.query = squel.update({
			separator: "\n"
		});
	}

	onPrepareTable(_) {
		_.storage.query.table(this.constructor.model.definition.table);
	}

	onPrepareDelete(_) {
		_.storage.query = squel.delete({
			separator: "\n"
		});
	}

	onPrepareFrom(_) {
		_.storage.query.from(this.constructor.model.definition.table);
	}

	onPrepareJoin(_) {}


	onPrepareJoinForParameters(_) {}

	onPrepareWhere(_) {}

	onPrepareWhereAddCommunityBoundaryTransformPair(t, c, modelDef) {
		let tt = t,
			cc = c;
		if (t === "@" && c === "@") {
			// @TODO: set COMMUNITY.ID from current authenticated session
			tt = 1; // this should be taken from request or something [_.input.auth.id_community]
			cc = undefined;
		} else if (t === "#") {
			tt = modelDef.table;
		}
		return [tt, cc];
	}

	onPrepareWhereAddCommunityBoundary(boundary, modelDef, query) {
		const [srcTableP, srcColumnP, dstTableP, dstColumnP, ] = boundary;
		const [srcTable, srcColumn] = this.onPrepareWhereAddCommunityBoundaryTransformPair(srcTableP, srcColumnP, modelDef);
		const [dstTable, dstColumn] = this.onPrepareWhereAddCommunityBoundaryTransformPair(dstTableP, dstColumnP, modelDef);
		if (dstColumn) {
			query.left_join(dstTable, null, `${srcTable}.${srcColumn} = ${dstTable}.${dstColumn}`);
		} else {
			query.where(`${srcTable}.${srcColumn} = ${dstTable}`);
		}
	}

	onPrepareWhereForCommunityBinding(_) {
		if (this.constructor.model.definition.getCommunityBoundaries) {
			const modelDef = this.constructor.model.definition;
			const boundaries = modelDef.getCommunityBoundaries();
			boundaries.forEach(boundary => {
				this.onPrepareWhereAddCommunityBoundary(boundary, modelDef, _.storage.query);
			});
		}
	}

	onPrepareWhereForParameters(_) {
		if (_.input.where) {
			[].concat(JSON.parse(_.input.where)).forEach(whereRule => {
				if (!(Array.isArray(whereRule))) {
					return; //dismissed
				}
				let [src, op, dst] = whereRule;
				if (typeof(src) !== "string" || typeof(src) !== "string") {
					return; //dismissed
				}
				if (this.constructor.acceptedOperators.indexOf(op) === -1) {
					return; //dismissed
				}
				if (["in", "not in"].indexOf(op.toLowerCase()) !== -1) {
					dst = [].concat(dst);
				}
				_.storage.query.where(`${this.constructor.onTranslateTableColumnExpression(src)} ${op} ?`, this.constructor.onTranslateTableColumnExpression(dst));
			});

		}
	}

	onPrepareWhereForId(_) {
		_.storage.query.where(`${this.constructor.model.definition.table}.id = ?`, parseInt(_.input.__id));
	}

	onPrepareSort(_) {
		if (_.input.sort) {
			_.input.sort.split(/,/g).forEach(sortRule => {
				const [tc, direction = "asc"] = sortRule.split(/\@/g);
				_.storage.query.order(this.constructor.onTranslateTableColumnExpression(tc), direction === "desc" ? "desc" : "asc");
			});
		}
	}

	onPrepareGroup(_) {
		if (typeof _.input.group === "string" && _.input.group.length) {
			_.input.group.split(/,/g).forEach(groupRule => {
				_.storage.query.group(this.constructor.onTranslateTableColumnExpression(groupRule));
			});
		}
	}

	onPrepareLimitForOne(_) {
		_.storage.query.limit(1);
	}

	onPrepareLimitForPagination(_) {
		let limit = this.constructor.defaultPaginationLimit;
		if (_.input.page && _.input.page === "0") {
			limit = 0;
		} else if (_.input.limit) {
			try {
				limit = parseInt(_.input.limit);
			} catch (error) {
				limit = this.constructor.defaultPaginationLimit;
			}
		}
		_.storage.queryMemo.limit = limit;
		if (limit !== 0) {
			_.storage.query.limit(limit);
		}
	}

	onPrepareOffsetForPagination(_) {
		if (_.storage.queryMemo.limit === 0) {
			return;
		}
		let page = 1;
		if (_.input.page) {
			try {
				page = parseInt(_.input.page) - 1;
			} catch (error) {}
			if (page < 0) {
				page = 0;
			}
		}
		_.storage.queryMemo.page = page;
		_.storage.queryMemo.offset = page * _.storage.queryMemo.limit;
		_.storage.query.offset(_.storage.queryMemo.offset);
	}

	onQueryForItem(_) {}

	onQuery(_) {}

	onQueryBefore(_) {
		_.output.data = {};
	}

	onQuerySchema(_) {
		_.output.data = {
			path: this.path,
			table: this.constructor.model.definition.table,
			model: this.constructor.model.definition.name,
			columns: this.constructor.model.definition.getPublicColumns(),
			relations: this.constructor.model.definition.allRelationships,
		};
	}

	async onQueryGetOne(_) {
		const sql = _.storage.query.toString();
		_.output.data = await this.router.app.db.getConnection().query(sql, {
			type: Sequelize.QueryTypes.SELECT
		});
	}

	async onQueryGetMany(_) {
		return this.onSelectQueryExecution(_);
	}

	async onQueryInsertOne(_) {
		return await this.onStandardQueryExecution(_);
	}

	async onQueryUpdateOne(_) {
		return await this.onStandardQueryExecution(_);
	}

	async onQueryDeleteOne(_) {
		return await this.onStandardQueryExecution(_);
	}

	async onSelectQueryExecution(_) {
		const sql = _.storage.query.toString();
		_.output.data = await this.router.app.db.getConnection().query(sql, {
			type: Sequelize.QueryTypes.SELECT
		});
	}

	async onStandardQueryExecution(_) {
		const sql = _.storage.query.toString();
		_.output.data = await this.router.app.db.getConnection().query(sql);
	}

	onQueryAfter(_) {}

	onBeforeQueryViewOne(_) {}
	
	async onQueryViewOne(_) {
		if(!("queries" in _.storage)) {
			_.storage.queries = {};
		}
		try {
			_.storage.queries.viewOneQuery = await this.getOne(new ParametersManager({input: {__id: _.input.__id}}));
			if(_.storage.queries.viewOneQuery && _.storage.queries.viewOneQuery.data) {
				_.storage.queries.viewOneQuery = _.storage.queries.viewOneQuery.data;
				if("0" in _.storage.queries.viewOneQuery) {
					_.storage.queries.viewOneQuery = _.storage.queries.viewOneQuery[0];
				}
			}
		} catch(error) {
			console.log(error);
			_.storage.queries.viewOneQuery = {error: true, errorData: error};
		}
	}
	
	onAfterQueryViewOne(_) {}

	onBeforeQueryViewMany(_) {}
	
	async onQueryViewMany(_) {
		if(!("queries" in _.storage)) {
			_.storage.queries = {};
		}
		try {
			const results = await this.getMany(new ParametersManager({input: {..._.input}}));
			if(results && results.data) {
				_.storage.queries.viewManyQuery = results.data;
			}
		} catch(error) {
			console.log(error);
			_.storage.queries.viewManyQuery = {error: true, errorData: error};
		}
	}
	
	onAfterQueryViewMany(_) {}

	onBeforeRenderViewOne(_) {}

	onAfterRenderViewOne(_) {}

	onTransform(_) {}

	onTransformSchema(_) {}

	onTransformGetOne(_) {
		if (_.output.data) {

		}
	}

	onTransformGetMany(_) {}

	onTransformPostOne(_) {}

	onTransformPutOne(_) {}

	onTransformDeleteOne(_) {}

	onPostjobs(_) {}

	onPostjobsSchema(_) {}

	onPostjobsGetOne(_) {}

	onPostjobsGetMany(_) {}

	onPostjobsPostOne(_) {}

	onPostjobsPutOne(_) {}

	onPostjobsDeleteOne(_) {}

	onEndRestOperation(_) {}

	onHandleError(_, error) {
		console.log(error);
		this.router.app.logger.error(error);
		throw error;
	}

	onAuthorizeViewManyMethod(_) {}

	onAdaptViewManyParameters(_) {}

	onValidateViewManyParameters(_) {}

	onPrejobsViewMany(_) {

	}

	onBeforeRenderViewMany(_) {}

	onRenderViewMany(_) {
		return this.onRenderTemplateSource("viewMany", {
			action: "viewMany",
			controller: this,
			_
		});
	}

	onAfterRenderViewMany(_) {}

	onAuthorizeViewOneMethod(_) {}

	onAdaptViewOneParameters(_) {}

	onValidateViewOneParameters(_) {}

	onPrejobsViewOne(_) {}

	onBeforeRenderViewOne(_) {}

	onRenderViewOne(_) {
		return this.onRenderTemplateSource("viewOne", {
			action: "viewOne",
			controller: this,
			_,
			fill: _.input.fill ? _.input.fill : {}
		});
	}

	onAfterRenderViewOne(_) {}

	onAuthorizeAddOneMethod(_) {}

	onAdaptAddOneParameters(_) {}

	onValidateAddOneParameters(_) {}

	onPrejobsAddOne(_) {}

	onQueryToGetOne() {

	}

	onBeforeRenderAddOne(_) {}

	onRenderAddOne(_) {
		return this.onRenderTemplateSource("addOne", {
			action: "addOne",
			controller: this,
			_
		});
	}

	onAfterRenderAddOne(_) {}

	onAuthorizeEditOneMethod(_) {}

	onAdaptEditOneParameters(_) {}

	onValidateEditOneParameters(_) {}

	onPrejobsEditOne(_) {}

	onBeforeRenderEditOne(_) {}

	onRenderEditOne(_) {
		return this.onRenderTemplateSource("editOne", {
			action: "editOne",
			controller: this,
			_
		});
	}

	onAfterRenderEditOne(_) {}

	onRenderTemplateSource(method, parameters) {
		return new Promise((resolve, reject) => {
			ejs.renderFile(this.templateSources[method], Object.assign({}, this.templateParameters, parameters, {}), this.constructor.defaultRenderOptions, (error, text) => {
				if (error) {
					return reject(error);
				}
				parameters._.output.data = text;
				return resolve(text);
			});
		});
	}

}

module.exports = ModelController;