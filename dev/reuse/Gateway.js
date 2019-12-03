class Gateway {

	static get DEFAULT_GATEWAY_INTERCALATION() {
		return parameters => parameters.exit;
	}

	static get DEFAULT_GATEWAY_ERROR_HANDLER() {
		return (error, parameters) => {
			console.log("Gateway error:", error);
			throw error;
		}
	}

	static create(source, methodNames = [], originalParameters = {}, errorHandler = this.DEFAULT_GATEWAY_ERROR_HANDLER, intercalation = this.DEFAULT_GATEWAY_INTERCALATION) {
		return (providedParameters = {}) => {
			return this.run(source, methodNames, {...originalParameters, ...providedParameters}, errorHandler, intercalation)
		}
	}

	static async run(source, methodNames = [], parameters = {}, errorHandler = this.DEFAULT_GATEWAY_ERROR_HANDLER, intercalation = this.DEFAULT_GATEWAY_INTERCALATION) {
		try {
			for(let i=0; i < methodNames.length; i++) {
				const methodNameCrude = methodNames[i];
				const isAsync = methodNameCrude.startsWith("~");
				const methodName = isAsync ? methodNameCrude.substr(1) : methodNameCrude;
				if(!(methodName in source)) {
					console.log(`Method ${methodName} was not found in source.`);
					throw new Error("Gateway: MethodNameNotFound: " + methodName);
				}
				if(typeof source[methodName] !== "function") {
					console.log(`Property ${methodName} is not a function.`);
					throw new Error("Gateway: InvalidMethodType: " + methodName);
				}
				if(isAsync) {
					await source[methodName](parameters);
				} else {
					source[methodName](parameters);
				}
				if(intercalation(parameters)) {
					return parameters;
				}
			}
		} catch(error) {
			return errorHandler(error, parameters);
		}
	}
}

module.exports = Gateway;