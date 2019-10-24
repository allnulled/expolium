const urljoin = require("url-join");

class StringUtils {

	static get DEFAULT_SECRET_TOKEN_VALID_CHARACTERS() {
		return "qwertyuiopasdfghjklmnbvcxz0123456789".split("");
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

}

module.exports = StringUtils;