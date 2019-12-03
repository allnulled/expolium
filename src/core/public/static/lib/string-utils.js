(() => {

	class StringUtils {

		static get DEFAULT_SECRET_TOKEN_VALID_CHARACTERS() {
			return "qwertyuiopasdfghjklmnbvcxz0123456789".split("");
		}

		static snakize(str) {
			return str.replace(/(?:^|\.?)([A-Z])/g, function(x, y) {
				return "_" + y.toLowerCase()
			}).replace(/^_/, "");
		}

		static hyphenize(str) {
			return this.snakize(str).replace(/_/g, "-");
		}

		static capitalize(str, startCapital = true) {
			let o = "";
			let capitalizeNext = startCapital;
			str.split("").forEach(c => {

				if (c === "_") {
					capitalizeNext = true;
				} else if (capitalizeNext) {
					o += c.toUpperCase();
					capitalizeNext = false;
				} else {
					o += c;
				}
			});
			return o;
		}

		static camelize(str) {
			let out = this.capitalize(str, false);
			out = out.substr(0, 1).toLowerCase() + out.substr(1);
			return out;
		}

		static humanize(strParam, startCapital = true, allCapitals = false) {
			let o = "";
			let str = this.snakize(strParam);
			let spaceNext = false;
			str = str.substr(0, 1)[startCapital ? "toUpperCase" : "toLowerCase"]() + str.substr(1);
			str.split("").forEach(c => {
				if (c === "_") {
					spaceNext = true;
				} else if (spaceNext) {
					o += " " + (allCapitals ? c.toUpperCase() : c.toLowerCase());
					spaceNext = false;
				} else {
					o += c;
				}
			});
			return o;
		}

		static sanitizeFilename(str) {
			return str.replace(/[\\\/]/g, ".");
		}

		static generateSecretToken(length = 255, items = this.DEFAULT_SECRET_TOKEN_VALID_CHARACTERS) {
			let out = "";
			while (out.length < length) {
				out += items[Math.floor(Math.random() * items.length)];
			}
			return out;
		}

		static stringify(data, tab = undefined) {
			const getCircularReplacer = () => {
				const seen = new WeakSet();
				return (key, value) => {
					if (typeof value === "object" && value !== null) {
						if (seen.has(value)) {
							return;
						}
						seen.add(value);
					}
					return value;
				};
			};
			return JSON.stringify(data, getCircularReplacer(), tab);
		}

		static parseJson(text) {
			return JSON.parse(text);
		}

		static generateId(len = 255, pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split("")) {
			let out = "";
			while (out.length < len) {
				out += pool[Math.floor(Math.random() * pool.length)];
			}
			return out;
		}

	}

	window.StringUtils = StringUtils;

})();