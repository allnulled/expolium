const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const StringUtils = require(process.env.PROJECT_ROOT + "/core/helper/StringUtils.js");

class ReflectionUtils {

	static get DEFAULT_GATEWAY_INTERCALATION() {
		return parameters => parameters.exit;
	}

	static get DEFAULT_GATEWAY_ERROR_HANDLER() {
		return (error, parameters) => {
			if(typeof parameters.response === "object" && parameters.response.sendJsonError) {
				return parameters.response.sendJsonError(error);
			}
			throw error;
		}
	}

	static async gateway(source, methodNames = [], parameters = {}, errorHandler = this.DEFAULT_GATEWAY_ERROR_HANDLER, intercalation = this.DEFAULT_GATEWAY_INTERCALATION) {
		try {
			for(let i=0; i < methodNames.length; i++) {
				const methodNameCrude = methodNames[i];
				const isAsync = methodNameCrude.startsWith("~");
				const methodName = isAsync ? methodNameCrude.substr(1) : methodNameCrude;
				if(!(methodName in source)) {
					console.log(`Method ${methodName} was not found in source.`);
					throw new ErrorManager.classes.UniversalError("MethodNameNotFound");
				}
				if(typeof source[methodName] !== "function") {
					console.log(`Property ${methodName} is not a function.`);
					throw new ErrorManager.classes.UniversalError("InvalidMethodType");
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

	static breakCircularity(data) {
		return StringUtils.parseJson(StringUtils.stringify(data));
	}
}

module.exports = ReflectionUtils;