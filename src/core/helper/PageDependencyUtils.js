const OverridableClass = require(process.env.PROJECT_ROOT + "/core/helper/OverridableClass.js");
const ErrorManager = require(process.env.PROJECT_ROOT + "/core/helper/ErrorManager.js");
const defaultDependencies = require(process.env.PROJECT_ROOT + "/core/config/html.dependencies.json");
const PageDependencyUtilsLogger = require(process.env.PROJECT_ROOT + "/core/helper/LoggerUtils.js").create("PageDependencyUtils");

class PageDependencyUtils extends OverridableClass {

	static get dependencies() {
		return defaultDependencies;
	}

	static getHtmlPageFromRequestParametersOutput({ data, metadata, anonymousMetadata = [] }) {
		const head = this.getSortedMetadataTags(metadata.tags, anonymousMetadata);
		const html = `<!DOCTYPE html>\n<html>\n<head>\n${head}\n</head>\n<body>\n${data}\n</body>\n</html>`;
		return html;
	}

	static getSortedMetadataTags(tags, anonymousMetadata = []) {
		let out = "";
		const dependencies = Object.keys(tags).filter(name => tags[name] === true);
		Object.keys(this.dependencies).forEach(dependencyName => {
			if(dependencies.indexOf(dependencyName) !== -1) {
				out += this.dependencies[dependencyName].contents + "\n";
			}
		});
		out += anonymousMetadata.join("\n");
		return out;
	}

}

module.exports = PageDependencyUtils;