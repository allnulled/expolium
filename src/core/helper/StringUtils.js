const urljoin = require("url-join");

class StringUtils {

	static get DEFAULT_SECRET_TOKEN_VALID_CHARACTERS() {
		return "qwertyuiopasdfghjklmnbvcxz0123456789".split("");
	}

	static snakize(str) {
		return str.replace(/(?:^|\.?)([A-Z])/g, function (x,y){return "_" + y.toLowerCase()}).replace(/^_/, "");
	}

	static hyphenize(str) {
		return this.snakize(str).replace(/_/g, "-");
	}

	static capitalize(str, startCapital = true) {
		let o = "";
		let capitalizeNext = startCapital;
		str.split("").forEach(c => {
			if(c === "_") {
				capitalizeNext = true;
			} else if(capitalizeNext) {
				o += c.toUpperCase();
				capitalizeNext = false;
			} else {
				o += c;
			}
		})
		return o;
	}

	static camelize(str) {
		return this.capitalize(str, false);
	}

	static humanize(strParam, startCapital = true, allCapitals = false) {
		let o = "";
		let str = this.snakize(strParam);
		let spaceNext = false;
		str = startCapital ? (str.substr(0,1).toUpperCase() + str.substr(1)) : str;
		console.log(str);
		str.split("").forEach(c => {
			if(c === "_") {
				spaceNext = true;
			} else if(spaceNext) {
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

	static joinUrl(...str) {
		return urljoin(...str);
	}

	static generateSecretToken(length = 255, items = this.DEFAULT_SECRET_TOKEN_VALID_CHARACTERS) {
		let out = "";
		while(out.length < length) {
			out += items[Math.floor(Math.random()*items.length)];
		}
		return out;
	}

	static stringify(data) {
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
		return JSON.stringify(data, getCircularReplacer());
	}

	static parseJson(text) {
		return JSON.parse(text);
	}

}

module.exports = StringUtils;