class CliUtils {

	static argumentableFactory(fn, scope = false) {
		if(typeof fn !== "function") {
			throw new Error("ParameterTypeError", "Required fn to be a function");
		}
		return (optionalParameters = undefined) => {
			if(typeof optionalParameters !== "undefined") {
				return scope ? fn.call(scope, optionalParameters) : fn(optionalParameters);
			} else {
				return scope ? fn.call(scope, require("yargs").argv) : fn(require("yargs").argv);
			}
		};
	}

}

module.exports = CliUtils;