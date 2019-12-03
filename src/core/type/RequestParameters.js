const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const DefaultParameters = require(__dirname + "/DefaultParameters.js");

class RequestParameters extends DefaultParameters {

	static get defaultParameters() {
		return {
			input: {},
			storage: {},
			output: {
				data: {},
				metadata: {
					tags: {}
				},
				code: 200,
				headers: {},
				extra: {},
			},
			headers: false,
			request: false,
			response: false,
			next: function() {}
		};
	}

/*
	static get defaultModifiers() {
		return [(input, _) => {
			if(input.request) {
				if(input.request.headers) {
					_.output.extra.__request_http_headers = input.request.headers;
				}
				if(input.request.originalUrl) {
					_.output.extra.__request_original_url = input.request.originalUrl;
				}
				if(input.request.query) {
					_.output.extra.__request_query_parameters = input.request.query;
				}
				if(input.request.body) {
					_.output.extra.__request_body_parameters = input.request.body;
				}
				if(input.request.params) {
					_.output.extra.__request_url_parameters = input.request.params;
				}
			}
		}]
	}
//*/

	static get specialParameters() {
		return ["input", "storage", "output"];
	}

	static modifyParameters(adaptedParameters) {
		if(adaptedParameters.request) {
			adaptedParameters.input = Object.assign({}, adaptedParameters.input, adaptedParameters.request.query || {}, adaptedParameters.request.body || {}, adaptedParameters.request.params || {})
		}
		return adaptedParameters;
	}

};

module.exports = RequestParameters;