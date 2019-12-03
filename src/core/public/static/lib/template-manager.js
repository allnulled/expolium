(function() {

	const ejs = window.ejs;
	const jQuery = window.jQuery;

	class TemplateManager {

		static DEFAULT_RENDER_TEXT_TO_TAG_OPERATION(args) {
			const { jElement, tag = "body" } = args;
			return jElement.appendTo(tag);
		}

		static renderTextToTag(args) {
			const {
				text = "",
				parameters = {},
				tag = "body",
				options = {},
				operation = this.DEFAULT_RENDER_TEXT_TO_TAG_OPERATION
			} = args;
			const element = ejs.render(text, parameters, options);
			const jElement = jQuery(element);
			return operation({...args, element, jElement});
		}

	}

	window.TemplateManager = TemplateManager;

})();