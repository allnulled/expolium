jQuery.fn.datetimepicker.Constructor.Default = jQuery.extend({}, jQuery.fn.datetimepicker.Constructor.Default, {
	format: "YYYY/MM/DD hh:mm:ss",
	icons: {
	    time: "far fa-clock",
	    date: "far fa-calendar",
	    up: "fa fa-arrow-up",
	    down: "fa fa-arrow-down",
	    previous: "fa fa-chevron-left",
	    next: "fa fa-chevron-right",
	    today: "far fa-calendar-check-o",
	    clear: "far fa-trash",
	    close: "far fa-times"
	},
	//debug: false,
	keepOpen: false
});

window.addEventListener("load", function() {
	jQuery("[data-tempus]").each(function() {
		const jThis = jQuery(this);
		const optionsData = jThis.data();
		const options = Object.keys(optionsData).reduce((out, optionKey) => {
			if(optionKey.startsWith("tempus")) {
				const tmp = optionKey.replace("tempus","");
				const key = tmp.substr(0,1).toLowerCase() + tmp.substr(1);
				out[key] = optionsData[optionKey];
			}
			return out;
		}, {});
		jThis.datetimepicker({sideBySide: true, ...options, inline: true});
		jThis.datetimepicker("hide");
	});
})