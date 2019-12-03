const glob = require("glob");

class FileSystemUtils {

	static findGlob(patterns, options = {}) {
		return new Promise((resolve, reject) => {
			return glob(patterns, options, (error, matches) => {
				if(error) {
					return reject(error);
				}
				return resolve(matches);
			});
		});
	}

	static findGlobSync(...args) {
		return glob.sync(...args);
	}

}

module.exports = FileSystemUtils;