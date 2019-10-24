const BasicProject = require(process.env.PROJECT_ROOT + "/core/project/Project.js");
const App = require(__dirname + "/../app/App.js");

class Project extends BasicProject {

	static get appClass() {
		return App;
	}

}

module.exports = Project;