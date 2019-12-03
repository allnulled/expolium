module.exports = (runner) => {
	return new Promise((resolve, reject) => {
		const path = require("path");
		const {
			assert,
			expect
		} = require("chai");
		describe("FormBuilderTest", () => {
			let FormBuilder = undefined;
			it("can load project", () => {});
			it("can load FormBuilder class", () => {
				FormBuilder = require(process.env.PROJECT_ROOT + "/core/form/builder/FormBuilder.js");
				expect(typeof FormBuilder).to.not.equal("undefined");
			});
			it("can build forms with FormBuilder instance", () => {
				const formBuilder = new FormBuilder();
				const output = formBuilder.build([{
					type: "string",
					name: "first"
				}, {
					type: "number",
					name: "second"
				}, {
					type: "text",
					name: "third"
				}]);
				expect(typeof output).to.equal("object");
				expect(output.metadata.jquery).to.equal(true);
				expect(output.metadata.bootstrap).to.equal(true);
				expect(output.metadata.popper).to.equal(true);
				// console.log(output);
			});
			it("can get html page with FormBuilder instance", () => {
				const formBuilder = new FormBuilder();
				const html = formBuilder.toPage([{
					type: "string",
					name: "first"
				}, {
					type: "number",
					name: "second"
				}, {
					type: "text",
					name: "third"
				}]);
				expect(typeof html).to.equal("string");
				expect(html.startsWith("<!DOCTYPE")).to.equal(true);
				expect(html.indexOf("name=\"first\"")).to.not.equal(-1);
				expect(html.indexOf("name=\"second\"")).to.not.equal(-1);
				expect(html.indexOf("name=\"third\"")).to.not.equal(-1);
				expect(html.indexOf("jquery")).to.not.equal(-1);
				expect(html.indexOf("popper")).to.not.equal(-1);
				expect(html.indexOf("bootstrap")).to.not.equal(-1);
			});
		});
		resolve();
	});
};