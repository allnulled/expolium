class ReflectionManager {

	static get DEFAULT_INTERCALATION() {
		return parameters => parameters.exit;
	}

	static get DEFAULT_ERROR_HANDLER() {
		return (error, parameters) => {
			console.log(error);
			return parameters.response ? parameters.response.sendJsonError(error, {}, error.code || 500) : null;
		}
	}

	static async gateway(source, methodNames = [], parameters = {}, errorHandler = this.DEFAULT_ERROR_HANDLER, intercalation = this.DEFAULT_INTERCALATION) {
		try {
			for(let i=0; i < methodNames.length; i++) {
				const methodNameCrude = methodNames[i];
				const isAsync = methodNameCrude.startsWith("~");
				const methodName = isAsync ? methodNameCrude.substr(1) : methodNameCrude;
				if(!(methodName in source)) {
					throw new Error("MethodNameNotFound", `Method ${methodName} was not found in source.`);
				}
				if(typeof source[methodName] !== "function") {
					throw new Error("InvalidMethodType", `Property ${methodName} is not a function.`);
				}
				if(isAsync) {
					await source[methodName](parameters);
				} else {
					source[methodName](parameters);
				}
				if(intercalation(parameters)) {
					return;
				}
			}
		} catch(error) {
			return errorHandler(error, parameters);
		}
	}

}

module.exports = ReflectionManager;