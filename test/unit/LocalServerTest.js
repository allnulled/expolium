module.exports = function(runner) {
	return new Promise((resolve, reject) => {
		const expect = require("chai").expect;
		const http = require("http")
		const express = require("express")
		const request = require("request")
		const requestPromise = require("request-promise")

		describe("LocalServerTest", function() {
			it("can open localhost:8088 server", done => {
				const app = express()
				app.get("*", (req, res) => {
					res.json({
						msg: 800
					}).send();
				});
				const server = http.createServer(app);
				server.listen(8088, () => {
					console.log("Server listening on localhost:8088");
					requestPromise("http://localhost:8088").then((jsonString) => {
						expect(JSON.parse(jsonString)).to.deep.equal({msg:800});
						server.close();
						return done();
					}).catch(error => {
						throw error;
					});
				})
			});
		});
		resolve();
	});

}