const fs = require("fs");
const ejs = require("ejs");
const squel = require("squel");
const Sequelize = require("sequelize");
const moment = require("moment");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");
const AuthControllerLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("AuthController");
const JsonResponse = require(process.env.PROJECT_ROOT + "/core/app/response/JsonResponse.js");
const BaseController = require(__dirname + "/BaseController.js");
const JsonRestApiResponse = require(process.env.PROJECT_ROOT + "/core/app/response/JsonRestApiResponse.js");
const HtmlPageResponse = require(process.env.PROJECT_ROOT + "/core/app/response/HtmlPageResponse.js");
const RequestParameters = require(process.env.PROJECT_ROOT + "/core/type/RequestParameters.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");

class AuthController extends BaseController {

	static get TEMPLATE_PATH_FOR() {
		return {
			Overview: process.env.PROJECT_ROOT + "/core/template/auth/overview.ejs",
			Login: process.env.PROJECT_ROOT + "/core/template/auth/login.ejs",
			Logout: process.env.PROJECT_ROOT + "/core/template/auth/logout.ejs",
			Register: process.env.PROJECT_ROOT + "/core/template/auth/register.ejs",
			ConfirmRegistration: process.env.PROJECT_ROOT + "/core/template/auth/confirm-registration.ejs",
			Unregister: process.env.PROJECT_ROOT + "/core/template/auth/unregister.ejs",
			ForgotPassword: process.env.PROJECT_ROOT + "/core/template/auth/forgot-password.ejs",
			ChangeCredentials: process.env.PROJECT_ROOT + "/core/template/auth/change-credentials.ejs",
			Refresh: process.env.PROJECT_ROOT + "/core/template/auth/refresh.ejs",
			Status: process.env.PROJECT_ROOT + "/core/template/auth/status.ejs",
		}
	}

	static addOverview(router, controller) {
		AuthControllerLogger.log("addOverview");
		router.$router.get(controller.route + "/overview", router.middleware || [], controller.dispatchViewOverview.bind(controller));
	}

	static addLogin(router, controller) {
		AuthControllerLogger.log("addLogin");
		router.$router.post(controller.route + "/login", router.middleware || [], controller.dispatchLogin.bind(controller));
		router.$router.get(controller.route + "/login", router.middleware || [], controller.dispatchViewLogin.bind(controller));
	}
	
	static addLogout(router, controller) {
		AuthControllerLogger.log("addLogout");
		router.$router.post(controller.route + "/logout", router.middleware || [], controller.dispatchLogout.bind(controller));
		router.$router.get(controller.route + "/logout", router.middleware || [], controller.dispatchViewLogout.bind(controller));
	}
	
	static addRegister(router, controller) {
		AuthControllerLogger.log("addRegister");
		router.$router.post(controller.route + "/register", router.middleware || [], controller.dispatchRegister.bind(controller));
		router.$router.get(controller.route + "/register", router.middleware || [], controller.dispatchViewRegister.bind(controller));
	}
	
	static addUnregister(router, controller) {
		AuthControllerLogger.log("addUnregister");
		router.$router.post(controller.route + "/unregister", router.middleware || [], controller.dispatchUnregister.bind(controller));
		router.$router.get(controller.route + "/unregister", router.middleware || [], controller.dispatchViewUnregister.bind(controller));
	}
	
	static addForgot(router, controller) {
		AuthControllerLogger.log("addForgot");
		router.$router.post(controller.route + "/forgot-password", router.middleware || [], controller.dispatchForgotPassword.bind(controller));
		router.$router.get(controller.route + "/forgot-password", router.middleware || [], controller.dispatchViewForgotPassword.bind(controller));
	}
	
	static addChange(router, controller) {
		AuthControllerLogger.log("addChange");
		router.$router.post(controller.route + "/change-credentials", router.middleware || [], controller.dispatchChangeCredentials.bind(controller));
		router.$router.get(controller.route + "/change-credentials", router.middleware || [], controller.dispatchViewChangeCredentials.bind(controller));
	}
	
	static addConfirm(router, controller) {
		AuthControllerLogger.log("addConfirm");
		router.$router.post(controller.route + "/confirm-registration", router.middleware || [], controller.dispatchConfirmRegistration.bind(controller));
		router.$router.get(controller.route + "/confirm-registration", router.middleware || [], controller.dispatchViewConfirmRegistration.bind(controller));
	}
	
	static addRefresh(router, controller) {
		AuthControllerLogger.log("addRefresh");
		router.$router.post(controller.route + "/refresh", router.middleware || [], controller.dispatchRefresh.bind(controller));
		router.$router.get(controller.route + "/refresh", router.middleware || [], controller.dispatchViewRefresh.bind(controller));
	}
	
	static addStatus(router, controller) {
		AuthControllerLogger.log("addStatus");
		router.$router.post(controller.route + "/status", router.middleware || [], controller.dispatchStatus.bind(controller));
		router.$router.get(controller.route + "/status", router.middleware || [], controller.dispatchViewStatus.bind(controller));
	}

	dispatchLogin(request, response, next) {
		return this.login(new RequestParameters({ request, response, next }));
	}

	async login(_) {
		AuthControllerLogger.log("~login");
		try {
			// @TODO: lifecycle
			this.onPrepareQueryUserAndPassword(_);
			if(_.exit) throw _.exit;
			this.onBeforeQuery(_);
			if(_.exit) throw _.exit;
			await this.onQueryUserAndPassword(_);
			if(_.exit) throw _.exit;
			this.onAfterQuery(_);
			if(_.exit) throw _.exit;
			this.onPrepareQueryInsertSession(_);
			if(_.exit) throw _.exit;
			this.onBeforeQuery(_);
			if(_.exit) throw _.exit;
			await this.onQueryInsertSession(_);
			if(_.exit) throw _.exit;
			this.onAfterQuery(_);
			if(_.exit) throw _.exit;
			this.onSetSessionCookie(_);
			if(_.exit) throw _.exit;
			this.onRespond(_);
			if(_.exit) throw _.exit;
		} catch(error) {
			this.onError(_, error);
		}
	}

	dispatchViewOverview(request, response, next) {
		return this.viewOverview(new RequestParameters({ request, response, next }));
	}

	async viewOverview(_) {
		AuthControllerLogger.log("~viewOverview");
		try {
			// @TODO: lifecycle
			this.onSetViewForOverview(_);
			if(_.exit) throw _.exit;
			await this.onRenderView(_);
			if(_.exit) throw _.exit;
			this.onRespondHtml(_);
			if(_.exit) throw _.exit;
		} catch(error) {
			this.onError(_, error);
		}
	}

	dispatchViewLogin(request, response, next) {
		return this.viewLogin(new RequestParameters({ request, response, next }));
	}

	async viewLogin(_) {
		AuthControllerLogger.log("~viewLogin");
		try {
			// @TODO: lifecycle
			this.onSetViewForLogin(_);
			if(_.exit) throw _.exit;
			await this.onRenderView(_);
			if(_.exit) throw _.exit;
			this.onRespondHtml(_);
			if(_.exit) throw _.exit;
		} catch(error) {
			this.onError(_, error);
		}
	}

	////

	dispatchLogout(request, response, next) {
		return this.logout(new RequestParameters({ request, response, next }));
	}

	async logout(_) {
		AuthControllerLogger.log("~logout");
		try {
			// @TODO: lifecycle
			await this.onDeleteSession(_);
			if(_.exit) throw _.exit;
			this.onDeleteSessionCookie(_);
			if(_.exit) throw _.exit;
			this.onRespond(_);
			if(_.exit) throw _.exit;
		} catch(error) {
			this.onError(_, error);
		}
	}

	dispatchViewLogout(request, response, next) {
		return this.viewLogout(new RequestParameters({ request, response, next }));
	}

	async viewLogout(_) {
		AuthControllerLogger.log("~viewLogout");
		try {
			// @TODO: lifecycle
			this.onSetViewForLogout(_);
			if(_.exit) throw _.exit;
			await this.onRenderView(_);
			if(_.exit) throw _.exit;
			this.onRespondHtml(_);
			if(_.exit) throw _.exit;
		} catch(error) {
			this.onError(_, error);
		}
	}

	////

	dispatchRegister(request, response, next) {
		return this.register(new RequestParameters({ request, response, next }));
	}

	async register(_) {
		AuthControllerLogger.log("~register");
		try {
			// @TODO: lifecycle
			this.onRespond(_);
			if(_.exit) throw _.exit;
		} catch(error) {
			this.onError(_, error);
		}
	}

	dispatchViewRegister(request, response, next) {
		return this.viewRegister(new RequestParameters({ request, response, next }));
	}

	async viewRegister(_) {
		AuthControllerLogger.log("~viewRegister");
		try {
			// @TODO: lifecycle
			this.onSetViewForRegister(_);
			if(_.exit) throw _.exit;
			await this.onRenderView(_);
			if(_.exit) throw _.exit;
			this.onRespondHtml(_);
			if(_.exit) throw _.exit;
		} catch(error) {
			this.onError(_, error);
		}
	}

	////

	dispatchConfirmRegistration(request, response, next) {
		return this.confirmRegistration(new RequestParameters({ request, response, next }));
	}

	async confirmRegistration(_) {
		AuthControllerLogger.log("~confirmRegistration");
		try {
			// @TODO: lifecycle
			this.onRespond(_);
			if(_.exit) throw _.exit;
		} catch(error) {
			this.onError(_, error);
		}
	}

	dispatchViewConfirmRegistration(request, response, next) {
		return this.viewConfirmRegistration(new RequestParameters({ request, response, next }));
	}

	async viewConfirmRegistration(_) {
		AuthControllerLogger.log("~viewConfirmRegistration");
		try {
			// @TODO: lifecycle
			this.onSetViewForConfirmRegistration(_);
			if(_.exit) throw _.exit;
			await this.onRenderView(_);
			if(_.exit) throw _.exit;
			this.onRespondHtml(_);
			if(_.exit) throw _.exit;
		} catch(error) {
			this.onError(_, error);
		}
	}

	////

	dispatchUnregister(request, response, next) {
		return this.unregister(new RequestParameters({ request, response, next }));
	}

	async unregister(_) {
		AuthControllerLogger.log("~unregister");
		try {
			// @TODO: lifecycle
			this.onRespond(_);
		} catch(error) {
			this.onError(_, error);
		}
	}

	dispatchViewUnregister(request, response, next) {
		return this.viewUnregister(new RequestParameters({ request, response, next }));
	}

	async viewUnregister(_) {
		AuthControllerLogger.log("~viewUnregister");
		try {
			// @TODO: lifecycle
			this.onSetViewForUnregister(_);
			if(_.exit) throw _.exit;
			await this.onRenderView(_);
			if(_.exit) throw _.exit;
			this.onRespondHtml(_);
			if(_.exit) throw _.exit;
		} catch(error) {
			this.onError(_, error);
		}
	}

	////

	dispatchForgotPassword(request, response, next) {
		return this.forgotPassword(new RequestParameters({ request, response, next }));
	}

	async forgotPassword(_) {
		AuthControllerLogger.log("~forgotPassword");
		try {
			// @TODO: lifecycle
			this.onRespond(_);
		} catch(error) {
			this.onError(_, error);
		}
	}

	dispatchViewForgotPassword(request, response, next) {
		return this.viewForgotPassword(new RequestParameters({ request, response, next }));
	}

	async viewForgotPassword(_) {
		AuthControllerLogger.log("~viewForgotPassword");
		try {
			// @TODO: lifecycle
			this.onSetViewForForgotPassword(_);
			if(_.exit) throw _.exit;
			await this.onRenderView(_);
			if(_.exit) throw _.exit;
			this.onRespondHtml(_);
			if(_.exit) throw _.exit;
		} catch(error) {
			this.onError(_, error);
		}
	}

	////

	dispatchChangeCredentials(request, response, next) {
		return this.changeCredentials(new RequestParameters({ request, response, next }));
	}

	async changeCredentials(_) {
		AuthControllerLogger.log("~changeCredentials");
		try {
			// @TODO: lifecycle
			this.onRespond(_);
			if(_.exit) throw _.exit;
		} catch(error) {
			this.onError(_, error);
		}
	}

	dispatchViewChangeCredentials(request, response, next) {
		return this.viewChangeCredentials(new RequestParameters({ request, response, next }));
	}

	async viewChangeCredentials(_) {
		AuthControllerLogger.log("~viewChangeCredentials");
		try {
			// @TODO: lifecycle
			this.onSetViewForChangeCredentials(_);
			if(_.exit) throw _.exit;
			await this.onRenderView(_);
			if(_.exit) throw _.exit;
			this.onRespondHtml(_);
			if(_.exit) throw _.exit;
		} catch(error) {
			this.onError(_, error);
		}
	}

	////

	dispatchRefresh(request, response, next) {
		return this.refresh(new RequestParameters({ request, response, next }));
	}

	async refresh(_) {
		AuthControllerLogger.log("~refresh");
		try {
			// @TODO: lifecycle
			this.onRespond(_);
			if(_.exit) throw _.exit;
		} catch(error) {
			this.onError(_, error);
		}
	}

	dispatchViewRefresh(request, response, next) {
		return this.viewRefresh(new RequestParameters({ request, response, next }));
	}

	async viewRefresh(_) {
		AuthControllerLogger.log("~viewRefresh");
		try {
			// @TODO: lifecycle
			this.onSetViewForRefresh(_);
			if(_.exit) throw _.exit;
			await this.onRenderView(_);
			if(_.exit) throw _.exit;
			this.onRespondHtml(_);
			if(_.exit) throw _.exit;
		} catch(error) {
			this.onError(_, error);
		}
	}

	////

	dispatchStatus(request, response, next) {
		return this.status(new RequestParameters({ request, response, next }));
	}

	async status(_) {
		AuthControllerLogger.log("~status");
		try {
			// @TODO: lifecycle
			this.onRespond(_);
			if(_.exit) throw _.exit;
		} catch(error) {
			this.onError(_, error);
		}
	}

	dispatchViewStatus(request, response, next) {
		return this.viewStatus(new RequestParameters({ request, response, next }));
	}

	async viewStatus(_) {
		AuthControllerLogger.log("~viewStatus");
		try {
			// @TODO: lifecycle
			this.onSetViewForStatus(_);
			if(_.exit) throw _.exit;
			await this.onRenderView(_);
			if(_.exit) throw _.exit;
			this.onRespondHtml(_);
			if(_.exit) throw _.exit;
		} catch(error) {
			this.onError(_, error);
		}
	}

	////

	beMountedOnRouter(router) {
		this.constructor.addOverview(router, this);
		this.constructor.addLogin(router, this);
		this.constructor.addLogout(router, this);
		this.constructor.addRegister(router, this);
		this.constructor.addUnregister(router, this);
		this.constructor.addForgot(router, this);
		this.constructor.addChange(router, this);
		this.constructor.addConfirm(router, this);
		this.constructor.addRefresh(router, this);
		this.constructor.addStatus(router, this);
	}

	onRespond(_) {
		AuthControllerLogger.log("onRespond", _.output);
		_.output.metadata["finished"] = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		if (_.response) {
			if (_.response.headersSent) {
				return;
			}
			return new JsonRestApiResponse().respond(_.output, _.response);
		}
	}

	onRespondHtml(_) {
		AuthControllerLogger.log("onRespondHtml");
		_.output.metadata["finished"] = moment().format("YYYY/MM/DD HH:mm:ss.SSS");
		if (_.response) {
			if (_.response.headersSent) {
				return;
			}
			return new HtmlPageResponse().respond(_.output, _.response);
		}
	}

	onRenderView(_) {
		AuthControllerLogger.log("onRenderView");
		return new Promise((resolve, reject) => {
			fs.readFile(_.storage.templateView, "utf8", function(error, data) {
				if(error) {
					return reject(error);
				}
				_.storage.templateViewSrc = data;
				_.output.data = ejs.render(data, {_, require});
				return resolve();
			});
		})
	}

	onError(_, error) {
		AuthControllerLogger.log("onError", error);
		if (_.response) {
			if (_.response.headersSent) {
				return;
			}
			_.output.code = 500;
			_.output.error = error;
			_.output.data = error;
			return new JsonRestApiResponse().respond(_.output, _.response);
		}
	}

	onSetViewForOverview(_) {
		AuthControllerLogger.log("onSetViewForOverview");
		_.storage.templateView = this.constructor.TEMPLATE_PATH_FOR.Overview;
	}

	onSetViewForLogin(_) {
		AuthControllerLogger.log("onSetViewForLogin");
		_.storage.templateView = this.constructor.TEMPLATE_PATH_FOR.Login;
	}

	onSetViewForLogout(_) {
		AuthControllerLogger.log("onSetViewForLogout");
		_.storage.templateView = this.constructor.TEMPLATE_PATH_FOR.Logout;
	}

	onSetViewForRegister(_) {
		AuthControllerLogger.log("onSetViewForRegister");
		_.storage.templateView = this.constructor.TEMPLATE_PATH_FOR.Register;
	}

	onSetViewForConfirmRegistration(_) {
		AuthControllerLogger.log("onSetViewForConfirmRegistration");
		_.storage.templateView = this.constructor.TEMPLATE_PATH_FOR.ConfirmRegistration;
	}

	onSetViewForUnregister(_) {
		AuthControllerLogger.log("onSetViewForUnregister");
		_.storage.templateView = this.constructor.TEMPLATE_PATH_FOR.Unregister;
	}

	onSetViewForForgotPassword(_) {
		AuthControllerLogger.log("onSetViewForForgotPassword");
		_.storage.templateView = this.constructor.TEMPLATE_PATH_FOR.ForgotPassword;
	}

	onSetViewForChangeCredentials(_) {
		AuthControllerLogger.log("onSetViewForChangeCredentials");
		_.storage.templateView = this.constructor.TEMPLATE_PATH_FOR.ChangeCredentials;
	}

	onSetViewForRefresh(_) {
		AuthControllerLogger.log("onSetViewForRefresh");
		_.storage.templateView = this.constructor.TEMPLATE_PATH_FOR.Refresh;
	}

	onSetViewForStatus(_) {
		AuthControllerLogger.log("onSetViewForStatus");
		_.storage.templateView = this.constructor.TEMPLATE_PATH_FOR.Status;
	}

	onPrepareQueryUserAndPassword(_) {
		AuthControllerLogger.log("onPrepareQueryUserAndPassword");
		_.storage.queryUserAndPassword = squel.select({
			separator: "\n",
			autoQuoteTableNames: true,
			autoQuoteFieldNames: true
		});
        _.storage.queryUserAndPassword.from("user");
		_.storage.queryUserAndPassword.where(
            squel.expr().and("name = ?", _.input.name).or("email = ?", _.input.name)
        );
		_.storage.queryUserAndPassword.where("password = ?", _.input.password);
	}

	onBeforeQuery(_) {
		AuthControllerLogger.log("onBeforeQuery");
	}

	async onQueryUserAndPassword(_) {
		AuthControllerLogger.log("onQueryUserAndPassword");
		try {
			const sql = _.storage.queryUserAndPassword.toString();
			_.storage.queryUserAndPasswordResult = await this.router.app.db.query(sql, {
				type: Sequelize.QueryTypes.SELECT
			});
			const isArray = Array.isArray(_.storage.queryUserAndPasswordResult);
			const hasItems = isArray && _.storage.queryUserAndPasswordResult.length;
			const hasOneItem = isArray && _.storage.queryUserAndPasswordResult.length === 1;
			if(hasOneItem) {
				_.storage.queryUserAndPasswordResult = _.storage.queryUserAndPasswordResult[0];
				_.output.data.user = _.storage.queryUserAndPasswordResult;
			} else if(hasItems) {
				_.exit = new Error("CriticalMultipleItemsResultError");
			} else {
				_.exit = "User and password did not match";
			}
		} catch(error) {
			this.onError(_, error);
		}
	}

	onPrepareQueryInsertSession(_) {
		AuthControllerLogger.log("onPrepareQueryInsertSession");
		const secretToken = StringUtils.generateId(200);
		const recoveryToken = StringUtils.generateId(200);
		_.storage.queryInsertSession = squel.insert();
		_.storage.queryInsertSession.into("session");
		_.storage.queryInsertSession.set("id_user", _.output.data.user.id);
		_.storage.queryInsertSession.set("secret_token", secretToken);
		_.storage.queryInsertSession.set("recovery_token", recoveryToken);
		_.storage.secretToken = secretToken;
		_.storage.recoveryToken = recoveryToken;
	}

	async onQueryInsertSession(_) {
		AuthControllerLogger.log("onQueryInsertSession");
		try {
			const sql = _.storage.queryInsertSession.toString();
			_.storage.queryInsertSessionResult = await this.router.app.db.query(sql);
			_.output.data.session = _.storage.queryInsertSessionResult;
			_.output.data.sessionId = _.output.data.session.insertId;
		} catch(error) {
			this.onError(_, error);
		}
	}

	onAfterQuery(_) {
		AuthControllerLogger.log("onAfterQuery");
	}

	onSetSessionCookie(_) {
		AuthControllerLogger.log("onSetSessionCookie");
		_.response.cookie("EXPOLIUM_SESSION_TOKEN", _.storage.secretToken);
	}

	async onDeleteSession(_) {
		AuthControllerLogger.log("onDeleteSession");
		try {
			const token = _.response.cookie("EXPOLIUM_SESSION_TOKEN");
			_.storage.queryDeleteSession = squel.delete();
			_.storage.queryDeleteSession.from("session");
			_.storage.queryDeleteSession.where("secret_token = ?", token);
			const sql = _.storage.queryDeleteSession.toString();
			const result = await this.router.app.db.query(sql, {
				type: Sequelize.QueryTypes.SELECT
			});
			_.output.data = result;
		} catch(error) {
			this.onError(_, error);
		}
	}

	onDeleteSessionCookie(_) {
		AuthControllerLogger.log("onDeleteSession");
		_.response.clearCookie("EXPOLIUM_SESSION_TOKEN");
	}

}

module.exports = AuthController;