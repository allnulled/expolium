<%

const fs = require("fs");
const ejs = require("ejs");
const formCollectionFile = ejs.render(exportJson.FormsCollection, {databaseConnection});
const formCollectionPath = process.env.PROJECT_ROOT + "/" + formCollectionFile;
const jsonRestClient = fs.readFileSync(formCollectionPath).toString();

%>

(function() {

	const axios = window.axios;

	class RestClient {

		static get DEFAULT_DATA() {
			return <%-JSON.stringify(JSON.parse(jsonRestClient), null, 2)%>;
		}

		static get DEFAULT_SETTINGS() {
			return {
				baseUrl: "/api/v1"
			};
		}

		static generateCrudByTable(tableData, client) {
			return {
				schema: () => {
					return client.api.get(tableData.endpoint + "/@");
				},
				find: (parameters = {}, options = {}) => {
					return client.api.get(tableData.endpoint, parameters, options);
				},
				get: (id, parameters = {}, options = {}) => {
					return client.api.get(tableData.endpoint + "/" + id, parameters, options);
				},
				post: (parameters = {}, options = {}) => {
					return client.api.post(tableData.endpoint, parameters, options);
				},
				put: (id, parameters = {}, options = {}) => {
					return client.api.put(tableData.endpoint + "/" + id, parameters, options);
				},
				putFaked: (id, parameters = {}, options = {}) => {
					return client.api.post(tableData.endpoint + "/" + id, parameters, options);
				},
				delete: (id, parameters = {}, options = {}) => {
					return client.api.delete(tableData.endpoint + "/" + id, parameters, options);
				},
				search: () => {
					window.location.href = client.settings.baseUrl + tableData.endpoint + "/@/view";
				},
				view: (id) => {
					window.location.href = client.settings.baseUrl + tableData.endpoint + "/@/view/" + id;
				},
				add: () => {
					window.location.href = client.settings.baseUrl + tableData.endpoint + "/@/add";
				},
				clone: (id) => {
					window.location.href = client.settings.baseUrl + tableData.endpoint + "/@/add/" + id;
				},
				edit: (id) => {
					window.location.href = client.settings.baseUrl + tableData.endpoint + "/@/edit/" + id;
				}

			}
		}

		static initialize(data, client) {
			if ("forms" in data) {
				for (let table in data.forms) {
					const tableData = data.forms[table];
					client[tableData.model] = this.generateCrudByTable(tableData, client);
				}
			}
			client.overview = () => {
					window.location.href = client.settings.baseUrl + "/@/view";
			};
			client.schema = () => {
					return client.api.get("/");
			};
			return client;
		}

		initialize() {
			// initialize this.api at your convenience here.
			this.api = this.axios.create({
				baseURL: this.settings.baseUrl
			});
			// this.api.defaults.headers.common["Authorization"] = "Bearer XXX";
		}

		constructor(data = this.constructor.DEFAULT_DATA, settings = this.constructor.DEFAULT_SETTINGS) {
			this.data = data;
			this.settings = settings;
			this.axios = axios;
			this.api = undefined; // this is an axios instance
			this.constructor.initialize(this.data, this);
			this.initialize();
		}



	}

	window.RestClient = RestClient;

})();
/*///////////////////////////////*/

/*
(async (baseUrl) => {
	const client = new RestClient();
	const api = await client.api(baseUrl);
	const instance = await api.Community.getOne(2);
	const putResult = await api.Community.putOne(instance.id, instance);
	const deleteResult = await api.Community.deleteOne(instance.id);
})("");
//*/