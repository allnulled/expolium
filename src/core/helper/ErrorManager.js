const FileSystemUtils = require(process.env.PROJECT_ROOT + "/core/helper/FileSystemUtils.js");

class ErrorManager {

	static get classes() {
		return FileSystemUtils.findGlobSync(process.env.PROJECT_ROOT + "/*/error/*Error.js").reduce((out, errorClassFile) => {
			if(!errorClassFile.endsWith("/BaseError.js")) {
				const errorClass = require(errorClassFile);
				out[errorClass.name] = errorClass;
			}
			return out;
		}, {});
	}

	static handle(error) {
		for(errorClass in this.classes) {
			if(error instanceof errorClass) {
				return errorClass.handle(error);
			}
		}
	}

}

module.exports = ErrorManager;