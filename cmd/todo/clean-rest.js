const rimraf = require("rimraf");
rimraf.sync(__dirname + "/../src/core.rest/db/model/*");
rimraf.sync(__dirname + "/../src/core.rest/db/controller/*");