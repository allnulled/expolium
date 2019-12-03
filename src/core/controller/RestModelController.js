const fs = require("fs");
const path = require("path");
const moment = require("moment");
const mysql = require("mysql2");
const Sequelize = require("sequelize");
const squel = require("squel");
const ejs = require("ejs");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");
const JsonRestApiResponse = require(process.env.PROJECT_ROOT + "/core/app/response/JsonRestApiResponse.js");
const HtmlPageResponse = require(process.env.PROJECT_ROOT + "/core/app/response/HtmlPageResponse.js");
const HtmlTemplateResponse = require(process.env.PROJECT_ROOT + "/core/app/response/HtmlTemplateResponse.js");
const RequestParameters = require(process.env.PROJECT_ROOT + "/core/type/RequestParameters.js");
const SqlItemToFormBuilderAdapter = require(process.env.PROJECT_ROOT + "/core/type/SqlItemToFormBuilderAdapter.js");
const PageDependencyUtils = require(process.env.PROJECT_ROOT + "/core/helper/PageDependencyUtils.js");
const FormBuilder = require(process.env.PROJECT_ROOT + "/core/form/builder/FormBuilder.js");
const RestModelControllerLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("RestModelController");
const BaseController = require(__dirname + "/BaseController.js");
const multer  = require("multer");
const multerStorage = multer.memoryStorage();
const diskStorage = multer.diskStorage({
	
});
const upload = multer({ dest: process.env.PROJECT_ROOT + "/core/upload/rest/file" });

class RestModelController extends BaseController {

	async schema(_ = {}) {
		RestModelControllerLogger.log("~schema");
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
		RestModelControllerLogger.log("~getOne");
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
		RestModelControllerLogger.log("~getMany");
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
			this.onPrepareWhereForSearch(_);
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
		RestModelControllerLogger.log("~postOne");
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
		RestModelControllerLogger.log("~putOne");
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
		RestModelControllerLogger.log("~deleteOne");
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
		RestModelControllerLogger.log("~viewMany");
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
		RestModelControllerLogger.log("~viewOne");
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
		RestModelControllerLogger.log("~addOne");
		try {
			this.onStartRestOperation(_);
			this.onAuthorizeAddOneMethod(_);
			this.onAdaptAddOneParameters(_);
			this.onValidateAddOneParameters(_);
			this.onPrejobsAddOne(_);
			if(_.input.__id) {
				this.onBeforeQueryViewOne(_);
				await this.onQueryViewOne(_);
				this.onAfterQueryViewOne(_);
			}
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
		RestModelControllerLogger.log("~editOne");
		try {
			this.onStartRestOperation(_);
			this.onAuthorizeEditOneMethod(_);
			this.onAdaptEditOneParameters(_);
			this.onValidateEditOneParameters(_);
			this.onPrejobsEditOne(_);
			this.onBeforeQueryViewOne(_);
			await this.onQueryViewOne(_);
			this.onAfterQueryViewOne(_);
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

	async removeOne(_ = {}) {
		RestModelControllerLogger.log("~removeOne");
		try {
			this.onStartRestOperation(_);
			this.onAuthorizeRemoveOneMethod(_);
			this.onAdaptRemoveOneParameters(_);
			this.onValidateRemoveOneParameters(_);
			this.onPrejobsRemoveOne(_);
			if(_.input.__id) {
				this.onBeforeQueryViewOne(_);
				await this.onQueryViewOne(_);
				this.onAfterQueryViewOne(_);
			}
			this.onBeforeRenderDeleteOne(_);
			await this.onRenderDeleteOne(_);
			this.onAfterRenderDeleteOne(_);
			this.onRespondHtml(_);
			this.onEndRestOperation(_);
			return _.output;
		} catch (error) {
			this.onError(_, error);
		}
	}

	////////////////////////////////////////////////////////////

	static get model() {
		throw new ErrorManager.classes.MustOverrideError("RestModelController[.constructor].model");
	}

	static get path() {
		throw new ErrorManager.classes.MustOverrideError("RestModelController[.constructor].route");
	}

	static get name() {
		throw new ErrorManager.classes.MustOverrideError("RestModelController[.constructor].name");
	}

	static get route() {
		return this.path;
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
			copyOne: true,
			editOne: true,
		};
	}

	get templateParameters() {
		return {
			StringUtils,
			PageDependencyUtils,
			require,
			StringUtils,
			FormBuilder,
			SqlItemToFormBuilderAdapter,
			moment,
		}
	}

	get templateSources() {
		return {
			overview: process.env.PROJECT_ROOT + "/core/template/rest/overview.ejs",
			viewMany: process.env.PROJECT_ROOT + "/core/template/rest/view-many.ejs",
			viewOne: process.env.PROJECT_ROOT + "/core/template/rest/view-one.ejs",
			addOne: process.env.PROJECT_ROOT + "/core/template/rest/add-one.ejs",
			copyOne: process.env.PROJECT_ROOT + "/core/template/rest/copy-one.ejs",
			editOne: process.env.PROJECT_ROOT + "/core/template/rest/edit-one.ejs",
		};
	}

	beMountedOnRouter(router, restRouter) {
		RestModelControllerLogger.log("beMountedOnRouter");
		let _router;
		if (restRouter) {
			_router = restRouter;
		} else {
			_router = router.$router;
		}
		// GET /@/view/:id
		if (this.methodsVisibility.viewOne) {
			const route = StringUtils.joinUrl("/", this.route, "@", "view", ":id")
			RestModelControllerLogger.log("adding " + route);
			_router.get(route, this.middleware || [], this.dispatchViewOne.bind(this));
		}
		// GET /@/view
		if (this.methodsVisibility.viewMany) {
			const route = StringUtils.joinUrl("/", this.route, "@", "view")
			RestModelControllerLogger.log("adding " + route);
			_router.get(route, this.middleware || [], this.dispatchViewMany.bind(this));
		}
		// GET /@/add/:id
		if (this.methodsVisibility.copyOne) {
			const route = StringUtils.joinUrl("/", this.route, "@", "add", ":id")
			RestModelControllerLogger.log("adding " + route);
			_router.get(route, this.middleware || [], this.dispatchAddOne.bind(this));
		}
		// GET /@/add
		if (this.methodsVisibility.addOne) {
			const route = StringUtils.joinUrl("/", this.route, "@", "add")
			RestModelControllerLogger.log("adding " + route);
			_router.get(route, this.middleware || [], this.dispatchAddOne.bind(this));
		}
		// GET /@/edit/:id
		if (this.methodsVisibility.editOne) {
			const route = StringUtils.joinUrl("/", this.route, "@", "edit", ":id");
			RestModelControllerLogger.log("adding " + route);
			_router.get(route, this.middleware || [], this.dispatchEditOne.bind(this));
		}
		// GET /@
		if (this.methodsVisibility.getSchema) {
			const route = StringUtils.joinUrl("/", this.route, "@");
			RestModelControllerLogger.log("adding " + route);
			_router.get(route, this.middleware || [], this.dispatchSchema.bind(this));
		}
		// GET /:id
		if (this.methodsVisibility.getOne) {
			const route = StringUtils.joinUrl("/", this.route, ":id");
			RestModelControllerLogger.log("adding " + route);
			_router.get(route, this.middleware || [], this.dispatchGetOne.bind(this));
		}
		// GET /
		if (this.methodsVisibility.getMany) {
			const route = StringUtils.joinUrl("/", this.route);
			RestModelControllerLogger.log("adding " + route);
			_router.get(route, this.middleware || [], this.dispatchGetMany.bind(this));
		}
		// POST /
		if (this.methodsVisibility.postOne) {
			const route = StringUtils.joinUrl("/", this.route);
			RestModelControllerLogger.log("adding " + route);
			_router.post(route, this.middleware || [], this.dispatchPostOne.bind(this));
		}
		// PUT /:id
		if (this.methodsVisibility.putOne) {
			const route = StringUtils.joinUrl("/", this.route, ":id");
			RestModelControllerLogger.log("adding " + route);
			const multipartition = [];
			const cols = this.constructor.model.definition.getPublicColumns();
			Object.keys(cols).reduce((out, col) => {
				const column = cols[col];
				if(column.__form_type === "blob") {
					multipartition.push({
						name: column.field,
						maxCount: 1
					});
				}
				return out;
			}, false);
			_router.put(route, upload.fields(multipartition), function(req, res, next) {
				multipartition.forEach(item => {
					if((item.name in req.files) && req.files[item.name][0].path) {
						req.body[item.name] = fs.readFileSync(req.files[item.name][0].path).toString();
					}
				})
				next();
			}, this.middleware || [], this.dispatchPutOne.bind(this));
		}
		// DELETE /:id
		if (this.methodsVisibility.deleteOne) {
			const route = StringUtils.joinUrl("/", this.route, ":id");
			RestModelControllerLogger.log("adding " + route);
			_router.delete(route, this.middleware || [], this.dispatchDeleteOne.bind(this));
		}
		// READFILE
		if(this.methodsVisibility.readFile) {
			const route = StringUtils.joinUrl("/", this.route, "@", "file");
			RestModelControllerLogger.log("adding " + route);
			_router.get(route, this.middleware || [], this.dispatchReadFile.bind(this));
		}
	}

	////////////////////////////////////////////////////////////

	constructor(options = {}) {
		super(options);
		this.route = this.constructor.route;
	}

	////////////////////////////////////////////////////////////

	adaptSchemaParameters(request, response, next) {
		RestModelControllerLogger.log("adaptSchemaParameters");
		return new RequestParameters({
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
		RestModelControllerLogger.log("adaptGetOneParameters");
		return new RequestParameters({
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
		RestModelControllerLogger.log("adaptGetManyParameters");
		return new RequestParameters({
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
		RestModelControllerLogger.log("adaptPostOneParameters");
		console.log(request.body);
		return new RequestParameters({
			controller: this,
			controllerClass: this.constructor,
			request: request,
			response: response,
			next: next,
			input: {
				__method: "POST",
				__operation: "post one",
				...request.body,
				...request.files ? request.files : {}
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
		RestModelControllerLogger.log("adaptPutOneParameters");
		return new RequestParameters({
			controller: this,
			controllerClass: this.constructor,
			request: request,
			response: response,
			next: next,
			input: {
				__method: "PUT",
				__operation: "put one",
				__id: request.params.id,
				...request.body,
				...request.files ? request.files : {}
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
		RestModelControllerLogger.log("adaptDeleteOneParameters");
		return new RequestParameters({
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
		RestModelControllerLogger.log("adaptViewManyParameters");
		return new RequestParameters({
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
		RestModelControllerLogger.log("adaptViewOneParameters");
		return new RequestParameters({
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
		RestModelControllerLogger.log("adaptAddOneParameters");
		return new RequestParameters({
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
		RestModelControllerLogger.log("adaptEditOneParameters");
		return new RequestParameters({
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
		RestModelControllerLogger.log("onRespond");
		_.output.metadata["finished"] = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		if (_.response) {
			if (_.response.headersSent) {
				return;
			}
			return new JsonRestApiResponse().respond(_.output, _.response);
		}
	}

	onRespondHtml(_) {
		RestModelControllerLogger.log("onRespondHtml");
		_.output.metadata["finished"] = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		if (_.response) {
			if (_.request.query.as === "template") {
				if (_.response.headersSent) {
					return;
				}
				return new HtmlTemplateResponse().respond(_.output, _.response);
			} else {
				if (_.response.headersSent) {
					return;
				}
				return new HtmlPageResponse().respond(_.output, _.response);
			}
		}
	}

	onError(_, error) {
		RestModelControllerLogger.log("onError", error);
		_.output.metadata["finished"] = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		_.output.code = 500;
		_.output.error = error;
		_.output.data = error;
		return new JsonRestApiResponse().respond(_.output, _.response);
	}

	dispatchSchema(request, response, next) {
		RestModelControllerLogger.log("dispatchSchema");
		return this.schema(this.adaptSchemaParameters(request, response, next));
	}

	dispatchGetOne(request, response, next) {
		RestModelControllerLogger.log("dispatchGetOne");
		return this.getOne(this.adaptGetOneParameters(request, response, next));
	}

	dispatchGetMany(request, response, next) {
		RestModelControllerLogger.log("dispatchGetMany");
		return this.getMany(this.adaptGetManyParameters(request, response, next));
	}

	dispatchPostOne(request, response, next) {
		RestModelControllerLogger.log("dispatchPostOne");
		return this.postOne(this.adaptPostOneParameters(request, response, next));
	}

	dispatchPutOne(request, response, next) {
		RestModelControllerLogger.log("dispatchPutOne");
		return this.putOne(this.adaptPutOneParameters(request, response, next));
	}

	dispatchDeleteOne(request, response, next) {
		RestModelControllerLogger.log("dispatchDeleteOne");
		return this.deleteOne(this.adaptDeleteOneParameters(request, response, next));
	}

	dispatchViewMany(request, response, next) {
		RestModelControllerLogger.log("dispatchViewMany");
		return this.viewMany(this.adaptViewManyParameters(request, response, next));
	}

	dispatchViewOne(request, response, next) {
		RestModelControllerLogger.log("dispatchViewOne");
		return this.viewOne(this.adaptViewOneParameters(request, response, next));
	}

	dispatchAddOne(request, response, next) {
		RestModelControllerLogger.log("dispatchAddOne");
		return this.addOne(this.adaptAddOneParameters(request, response, next));
	}

	dispatchEditOne(request, response, next) {
		RestModelControllerLogger.log("dispatchEditOne");
		return this.editOne(this.adaptEditOneParameters(request, response, next));
	}

	////////////////////////////////////////////////

	onStartRestOperation(_) {
		RestModelControllerLogger.log("onStartRestOperation");
	}

	onAuthorize(_) {
		RestModelControllerLogger.log("onAuthorize");
	}

	onAuthorizeSchemaMethod(_) {
		RestModelControllerLogger.log("onAuthorizeSchemaMethod");
	}

	onAuthorizeGetManyMethod(_) {
		RestModelControllerLogger.log("onAuthorizeGetManyMethod");
	}

	onAuthorizeGetOneMethod(_) {
		RestModelControllerLogger.log("onAuthorizeGetOneMethod");
	}

	onAuthorizePostOneMethod(_) {
		RestModelControllerLogger.log("onAuthorizePostOneMethod");
	}

	onAuthorizePutOneMethod(_) {
		RestModelControllerLogger.log("onAuthorizePutOneMethod");
	}

	onAuthorizeDeleteOneMethod(_) {
		RestModelControllerLogger.log("onAuthorizeDeleteOneMethod");
	}

	onAuthorizeViewOneMethod(_) {
		RestModelControllerLogger.log("onAuthorizeViewOneMethod");
	}

	onAdapt(_) {
		RestModelControllerLogger.log("onAdapt");
	}

	onAdaptGetManyParameters(_) {
		RestModelControllerLogger.log("onAdaptGetManyParameters");
	}

	onAdaptGetOneParameters(_) {
		RestModelControllerLogger.log("onAdaptGetOneParameters");
	}

	onAdaptPostOneParameters(_) {
		RestModelControllerLogger.log("onAdaptPostOneParameters");
	}

	onAdaptPutOneParameters(_) {
		RestModelControllerLogger.log("onAdaptPutOneParameters");
	}

	onAdaptDeleteOneParameters(_) {
		RestModelControllerLogger.log("onAdaptDeleteOneParameters");
	}

	onAdaptViewOneParameters(_) {
		RestModelControllerLogger.log("onAdaptViewOneParameters");
	}

	onValidate(state) {
		RestModelControllerLogger.log("onValidate");
	}

	onValidateSchemaParameters(_) {
		throw new Error("Method validateSchemaParameters should be overriden, if any");
	}

	onValidateGetOneParameters(_) {
		RestModelControllerLogger.log("onValidateGetOneParameters");
		const columns = this.constructor.model.definition.columns;
		// @TODO: check that all parameters are valid.
		//throw new Error("Not valid parameter");
	}

	onValidateGetManyParameters(_) {
		RestModelControllerLogger.log("onValidateGetManyParameters");
		const {
			input
		} = _;
		const columns = this.constructor.model.definition.columns;
		// @TODO: check that all parameters are valid.
		//throw new Error("Not valid parameter");
	}

	onValidatePostOneParameters(_) {
		RestModelControllerLogger.log("onValidatePostOneParameters");
		const {
			input
		} = _;
		const columns = this.constructor.model.definition.columns;
		// @TODO: check that all parameters are valid.
		//throw new Error("Not valid parameter");
	}

	onValidatePutOneParameters(_) {
		RestModelControllerLogger.log("onValidatePutOneParameters");
		const {
			input
		} = _;
		const columns = this.constructor.model.definition.columns;
		// @TODO: check that all parameters are valid.
		//throw new Error("Not valid parameter");
	}

	onValidateDeleteOneParameters(_) {
		RestModelControllerLogger.log("onValidateDeleteOneParameters");
		const {
			input
		} = _;
		const columns = this.constructor.model.definition.columns;
		// @TODO: check that all parameters are valid.
		//throw new Error("Not valid parameter");
	}

	onValidateViewOneParameters(_) {
		RestModelControllerLogger.log("onValidateViewOneParameters");
	}

	onPrejobs(_) {
		RestModelControllerLogger.log("onPrejobs");
	}

	onPrejobsSchema(_) {
		RestModelControllerLogger.log("onPrejobsSchema");
	}

	onPrejobsGetOne(_) {
		RestModelControllerLogger.log("onPrejobsGetOne");
	}

	onPrejobsGetMany(_) {
		RestModelControllerLogger.log("onPrejobsGetMany");
	}

	onPrejobsPostOne(_) {
		RestModelControllerLogger.log("onPrejobsPostOne");
	}

	onPrejobsPutOne(_) {
		RestModelControllerLogger.log("onPrejobsPutOne");
	}

	onPrejobsDeleteOne(_) {
		RestModelControllerLogger.log("onPrejobsDeleteOne");
	}

	onPrejobsViewOne(_) {
		RestModelControllerLogger.log("onPrejobsViewOne");
	}

	onPrepare(_) {
		RestModelControllerLogger.log("onPrepare");
	}

	onPrepareSelect(_) {
		RestModelControllerLogger.log("onPrepareSelect");
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
		RestModelControllerLogger.log("onPrepareSelectForAttachedModels");
	}

	static onTransformJoinAttachedModelsParameters(controller, relationRule, tables) {
		RestModelControllerLogger.log("static");
	}

	onPrepareJoinForAttachedModels(_) {
		RestModelControllerLogger.log("onPrepareJoinForAttachedModels");
	}

	////////////////////////////////////////////////////

	onPrepareInsert(_) {
		RestModelControllerLogger.log("onPrepareInsert");
		_.storage.query = squel.insert({
			separator: "\n"
		});
	}

	onPrepareInto(_) {
		RestModelControllerLogger.log("onPrepareInto");
		_.storage.query.into(this.constructor.model.definition.table);
	}

	onPrepareSetFields(_) {
		RestModelControllerLogger.log("onPrepareSetFields");
		console.log(11, _.input);
		console.log(11.1, _.request.body);
		const cols = this.constructor.model.definition.getPublicColumns();
		for (let prop in _.input) {
			// console.log(12, prop, _.input[prop]);
			if (Object.keys(cols).indexOf(prop) !== -1) {
				// _.storage.query.set(`${this.constructor.model.definition.table}.${prop}`, _.input[prop]);
				if(typeof _.input[prop] === "object") {
					_.storage.query.set(`${prop}`, _.input[prop].value, _.input[prop]);
				} else if(prop !== "id") {
					_.storage.query.set(`${prop}`, _.input[prop]);
				}
			}
		}
		// console.log(17);
	}

	////////////////////////////////////////////////////

	onPrepareUpdate(_) {
		RestModelControllerLogger.log("onPrepareUpdate");
		_.storage.query = squel.update({
			separator: "\n"
		});
	}

	onPrepareTable(_) {
		RestModelControllerLogger.log("onPrepareTable");
		_.storage.query.table(this.constructor.model.definition.table);
	}

	onPrepareDelete(_) {
		RestModelControllerLogger.log("onPrepareDelete");
		_.storage.query = squel.delete({
			separator: "\n"
		});
	}

	onPrepareFrom(_) {
		RestModelControllerLogger.log("onPrepareFrom");
		_.storage.query.from(this.constructor.model.definition.table);
	}

	onPrepareJoin(_) {
		RestModelControllerLogger.log("onPrepareJoin");
	}


	onPrepareJoinForParameters(_) {
		RestModelControllerLogger.log("onPrepareJoinForParameters");
	}

	onPrepareWhere(_) {
		RestModelControllerLogger.log("onPrepareWhere");
	}

	onPrepareWhereAddCommunityBoundaryTransformPair(t, c, modelDef) {
		RestModelControllerLogger.log("onPrepareWhereAddCommunityBoundaryTransformPair");
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
		RestModelControllerLogger.log("onPrepareWhereAddCommunityBoundary");
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
		RestModelControllerLogger.log("onPrepareWhereForCommunityBinding");
		if (this.constructor.model.definition.getCommunityBoundaries) {
			const modelDef = this.constructor.model.definition;
			const boundaries = modelDef.getCommunityBoundaries();
			boundaries.forEach(boundary => {
				this.onPrepareWhereAddCommunityBoundary(boundary, modelDef, _.storage.query);
			});
		}
	}

	onPrepareWhereForParameters(_) {
		RestModelControllerLogger.log("onPrepareWhereForParameters");
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

	onPrepareWhereForSearch(_) {
		RestModelControllerLogger.log(_.input);
		if(_.input.search) {
			const table = this.constructor.model.definition.table;
			const cols = this.constructor.model.definition.getPublicColumns();
			const expr = squel.expr();
			Object.keys(cols).forEach(col => {
				expr.or(`${table}.${col} LIKE ?`, `%${_.input.search}%`);
			});
			_.storage.query.where(expr);
		}
	}

	onPrepareWhereForId(_) {
		RestModelControllerLogger.log("onPrepareWhereForId");
		_.storage.query.where(`${this.constructor.model.definition.table}.id = ?`, parseInt(_.input.__id));
	}

	onPrepareSort(_) {
		RestModelControllerLogger.log("onPrepareSort");
		if (_.input.sort) {
			const sort = JSON.parse(_.input.sort);
			sort.forEach(rule => {
				const [tc, direction="asc"] = rule;
				_.storage.query.order(this.constructor.onTranslateTableColumnExpression(tc), direction === "desc" ? "desc" : "asc");
			});
		}
	}

	onPrepareGroup(_) {
		RestModelControllerLogger.log("onPrepareGroup");
		if (typeof _.input.group === "string" && _.input.group.length) {
			_.input.group.split(",").forEach(groupRule => {
				_.storage.query.group(this.constructor.onTranslateTableColumnExpression(groupRule));
			});
		}
	}

	onPrepareLimitForOne(_) {
		RestModelControllerLogger.log("onPrepareLimitForOne");
		_.storage.query.limit(1);
	}

	onPrepareLimitForPagination(_) {
		RestModelControllerLogger.log("onPrepareLimitForPagination");
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
		RestModelControllerLogger.log("onPrepareOffsetForPagination");
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
		} else {
			page = page - 1;
		}
		_.storage.queryMemo.page = page;
		_.storage.queryMemo.offset = page * _.storage.queryMemo.limit;
		_.storage.query.offset(_.storage.queryMemo.offset);
	}

	onQueryForItem(_) {
		RestModelControllerLogger.log("onQueryForItem");
	}

	onQuery(_) {
		RestModelControllerLogger.log("onQuery");
	}

	onQueryBefore(_) {
		RestModelControllerLogger.log("onQueryBefore");
		_.output.data = {};
	}

	onQuerySchema(_) {
		RestModelControllerLogger.log("onQuerySchema");
		_.output.data = {
			path: this.route,
			table: this.constructor.model.definition.table,
			model: this.constructor.model.definition.name,
			columns: this.constructor.model.definition.getPublicColumns(),
			relations: this.constructor.model.definition.allRelationships,
		};
	}

	onQueryGetOne(_) {
		RestModelControllerLogger.log("~onQueryGetOne");
		return this.onSelectQueryExecution(_);
	}

	onQueryGetMany(_) {
		RestModelControllerLogger.log("~onQueryGetMany");
		return this.onSelectQueryExecution(_);
	}

	onQueryInsertOne(_) {
		RestModelControllerLogger.log("~onQueryInsertOne");
		return this.onStandardQueryExecution(_);
	}

	onQueryUpdateOne(_) {
		RestModelControllerLogger.log("~onQueryUpdateOne");
		return this.onStandardQueryExecution(_);
	}

	onQueryDeleteOne(_) {
		RestModelControllerLogger.log("~onQueryDeleteOne");
		return this.onStandardQueryExecution(_);
	}

	async onSelectQueryExecution(_) {
		RestModelControllerLogger.log("~onSelectQueryExecution");
		try {
			const sql = _.storage.query.toString();
			_.output.data = await this.router.app.db.query(sql, {
				type: Sequelize.QueryTypes.SELECT
			});
		} catch (error) {
			RestModelControllerLogger.log("error on select query:", error);
			throw error;
		}
	}

	async onStandardQueryExecution(_) {
		try {
			RestModelControllerLogger.log("~onStandardQueryExecution");
			const sql = _.storage.query.toString();
			RestModelControllerLogger.log("~onStandardQueryExecution sql:", sql);
			_.output.data = await this.router.app.db.query(sql);
		} catch (error) {
			RestModelControllerLogger.log("error on standard query:", error);
			throw error;
		}
	}

	onQueryAfter(_) {
		RestModelControllerLogger.log("onQueryAfter");
	}

	onBeforeQueryViewOne(_) {
		RestModelControllerLogger.log("onBeforeQueryViewOne");
	}

	async onQueryViewOne(_) {
		RestModelControllerLogger.log("~onQueryViewOne");
		if (!("queries" in _.storage)) {
			_.storage.queries = {};
		}
		try {
			_.storage.queries.viewOneQuery = await this.getOne(new RequestParameters({
				input: {
					__id: _.input.__id
				}
			}));
			if (_.storage.queries.viewOneQuery && _.storage.queries.viewOneQuery.data) {
				_.storage.queries.viewOneQuery = _.storage.queries.viewOneQuery.data;
				if ("0" in _.storage.queries.viewOneQuery) {
					_.storage.queries.viewOneQuery = _.storage.queries.viewOneQuery[0];
				}
			}
			_.storage.queries.viewOneQueryStatus = "success";
		} catch (error) {
			console.log(error);
			_.storage.queries.viewOneQueryStatus = "error";
			_.storage.queries.viewOneQuery = {
				error: true,
				errorData: error
			};
		}
	}

	onAfterQueryViewOne(_) {
		RestModelControllerLogger.log("onAfterQueryViewOne");
	}

	onBeforeQueryViewMany(_) {
		RestModelControllerLogger.log("onBeforeQueryViewMany");
	}

	async onQueryViewMany(_) {
		RestModelControllerLogger.log("~onQueryViewMany");
		if (!("queries" in _.storage)) {
			_.storage.queries = {};
		}
		try {
			const results = await this.getMany(new RequestParameters({
				input: Object.assign({}, _.input)
			}));
			if (results && results.data) {
				_.storage.queries.viewManyQuery = results.data;
			}
		} catch (error) {
			// @TOFIX: wtf is this
			console.log(error);
			_.storage.queries.viewManyQuery = {
				error: true,
				errorData: error
			};
		}
	}

	onAfterQueryViewMany(_) {
		RestModelControllerLogger.log("onAfterQueryViewMany");
	}

	onBeforeRenderViewOne(_) {
		RestModelControllerLogger.log("onBeforeRenderViewOne");
	}

	onAfterRenderViewOne(_) {
		RestModelControllerLogger.log("onAfterRenderViewOne");
	}

	onTransform(_) {
		RestModelControllerLogger.log("onTransform");
	}

	onTransformSchema(_) {
		RestModelControllerLogger.log("onTransformSchema");
	}

	onTransformGetOne(_) {
		RestModelControllerLogger.log("onTransformGetOne");
		if (_.output.data && Array.isArray(_.output.data) && _.output.data.length === 1) {
			_.output.data = _.output.data[0];
		} else if (!Array.isArray(_.output.data)) {
			// error
		} else if (_.output.data.length === 0) {
			_.output.data = null;
		} else {
			// db inconsistency error
		}
	}

	onTransformGetMany(_) {
		RestModelControllerLogger.log("onTransformGetMany");
	}

	onTransformPostOne(_) {
		RestModelControllerLogger.log("onTransformPostOne");
	}

	onTransformPutOne(_) {
		RestModelControllerLogger.log("onTransformPutOne");
	}

	onTransformDeleteOne(_) {
		RestModelControllerLogger.log("onTransformDeleteOne");
	}

	onPostjobs(_) {
		RestModelControllerLogger.log("onPostjobs");
	}

	onPostjobsSchema(_) {
		RestModelControllerLogger.log("onPostjobsSchema");
	}

	onPostjobsGetOne(_) {
		RestModelControllerLogger.log("onPostjobsGetOne");
	}

	onPostjobsGetMany(_) {
		RestModelControllerLogger.log("onPostjobsGetMany");
	}

	onPostjobsPostOne(_) {
		RestModelControllerLogger.log("onPostjobsPostOne");
	}

	onPostjobsPutOne(_) {
		RestModelControllerLogger.log("onPostjobsPutOne");
	}

	onPostjobsDeleteOne(_) {
		RestModelControllerLogger.log("onPostjobsDeleteOne");
	}

	onEndRestOperation(_) {
		RestModelControllerLogger.log("onEndRestOperation");
	}

	onHandleError(_, error) {
		RestModelControllerLogger.log("onHandleError", error);
		this.router.app.logger.error(error);
		throw error;
	}

	onAuthorizeViewManyMethod(_) {
		RestModelControllerLogger.log("onAuthorizeViewManyMethod");
	}

	onAdaptViewManyParameters(_) {
		RestModelControllerLogger.log("onAdaptViewManyParameters");
	}

	onValidateViewManyParameters(_) {
		RestModelControllerLogger.log("onValidateViewManyParameters");
	}

	onPrejobsViewMany(_) {
		RestModelControllerLogger.log("onPrejobsViewMany");
	}

	onBeforeRenderViewMany(_) {
		RestModelControllerLogger.log("onBeforeRenderViewMany");
	}

	onRenderViewMany(_) {
		RestModelControllerLogger.log("onRenderViewMany");
		return this.onRenderTemplateSource("viewMany", {
			action: "viewMany",
			controller: this,
			_
		});
	}

	onAfterRenderViewMany(_) {
		RestModelControllerLogger.log("onAfterRenderViewMany");
	}

	onAuthorizeViewOneMethod(_) {
		RestModelControllerLogger.log("onAuthorizeViewOneMethod");
	}

	onAdaptViewOneParameters(_) {
		RestModelControllerLogger.log("onAdaptViewOneParameters");
	}

	onValidateViewOneParameters(_) {
		RestModelControllerLogger.log("onValidateViewOneParameters");
	}

	onPrejobsViewOne(_) {
		RestModelControllerLogger.log("onPrejobsViewOne");
	}

	onBeforeRenderViewOne(_) {
		RestModelControllerLogger.log("onBeforeRenderViewOne");
	}

	onRenderViewOne(_) {
		return this.onRenderTemplateSource("viewOne", {
			action: "viewOne",
			controller: this,
			_,
			fill: _.input.fill ? _.input.fill : {}
		});
	}

	onAfterRenderViewOne(_) {
		RestModelControllerLogger.log("onAfterRenderViewOne");
	}

	onAuthorizeAddOneMethod(_) {
		RestModelControllerLogger.log("onAuthorizeAddOneMethod");
	}

	onAdaptAddOneParameters(_) {
		RestModelControllerLogger.log("onAdaptAddOneParameters");
	}

	onValidateAddOneParameters(_) {
		RestModelControllerLogger.log("onValidateAddOneParameters");
	}

	onPrejobsAddOne(_) {
		RestModelControllerLogger.log("onPrejobsAddOne");
	}


	onBeforeRenderAddOne(_) {
		RestModelControllerLogger.log("onBeforeRenderAddOne");
	}

	onRenderAddOne(_) {
		RestModelControllerLogger.log("onRenderAddOne");
		if(typeof _.input.__id === "undefined") {
			return this.onRenderTemplateSource("addOne", {
				action: "addOne",
				controller: this,
				_,
				fill: _.input.fill ? _.input.fill : {}
			});
		} else {
			return this.onRenderTemplateSource("copyOne", {
				action: "copyOne",
				controller: this,
				_,
				fill: _.input.fill ? _.input.fill : {}
			});
		}
	}

	onAfterRenderAddOne(_) {
		RestModelControllerLogger.log("onAfterRenderAddOne");
	}

	onAuthorizeEditOneMethod(_) {
		RestModelControllerLogger.log("onAuthorizeEditOneMethod");
	}

	onAdaptEditOneParameters(_) {
		RestModelControllerLogger.log("onAdaptEditOneParameters");
	}

	onValidateEditOneParameters(_) {
		RestModelControllerLogger.log("onValidateEditOneParameters");
	}

	onPrejobsEditOne(_) {
		RestModelControllerLogger.log("onPrejobsEditOne");
	}

	onBeforeRenderEditOne(_) {
		RestModelControllerLogger.log("onBeforeRenderEditOne");
	}

	onRenderEditOne(_) {
		RestModelControllerLogger.log("onRenderEditOne");
		return this.onRenderTemplateSource("editOne", {
			action: "editOne",
			controller: this,
			_,
			fill: _.input.fill ? _.input.fill : {}
		});
	}

	onAfterRenderEditOne(_) {
		RestModelControllerLogger.log("onAfterRenderEditOne");
	}

	onRenderTemplateSource(method, parameters) {
		RestModelControllerLogger.log("onRenderTemplateSource");
		return new Promise((resolve, reject) => {
			const dataTypes = [];
			const formOutput = new FormBuilder().build(dataTypes, parameters._);
			// const resultOutput = FormBuilder.mixOutputs(parameters._.output, formOutput);
			//*
		// RestModelControllerLogger.log("parameters._.output.metadata.tags", parameters._.output.metadata.tags);
			if(parameters && parameters._ && parameters._.output && parameters._.output.metadata && parameters._.output.metadata.tags) {
				parameters._.output.metadata.tags = {...parameters._.output.metadata.tags, ...formOutput.metadata.tags};
			}
			ejs.renderFile(this.templateSources[method], Object.assign({}, this.templateParameters, parameters, {formOutput}), this.constructor.defaultRenderOptions, (error, text) => {
				if (error) {
					return reject(error);
				}
				parameters._.output.data = text;
				return resolve(text);
			});
			//*/
		});
	}

}

module.exports = RestModelController;