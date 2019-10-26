const fs = require("fs");
const groupArray = require("group-array");

class CollectionManager {

	static from(...args) {
		return new this(...args);
	}

	constructor(source, options = {}) {
		this.original = source;
		this.options = options;
		Object.keys(this.constructor).forEach(propertyName => {
			if(typeof this.constructor[propertyName] === "function") {
				if(propertyName !== "constructor") {
					this[propertyName] = ((p) => {
						return (...args) => {
							return this.constructor[p](this.original, ...args);
						}
					})(propertyName);
				}
			}
		})
	}

	static getDefaultTypeEmpty(original) {
		return Array.isArray(original) ? [] : {};
	}

	static toArray(original) {
		return Object.assign([], original);
	}

	static toObject(original) {
		return Object.assign({}, original);
	}

	static toString() {
		return this.toJson();
	}

	static toJson(original) {
		return JSON.stringify(original);
	}

	static toFile(original, file) {
		fs.writeFileSync(file, JSON.stringify(original, null, 4), "utf8");
	}

	static getKeys(original) {
		return Object.keys(original);
	}

	static getValues(original) {
		return Object.values(original);
	}

	static getOnlyKeys(original, keys) {
		return Object.keys(original).reduce((all, index) => {
			if(keys.indexOf(index) !== -1) {
				all[index] = original[index];
			}
			return all;
		}, this.getDefaultTypeEmpty(original));
	}

	static mixObjects(original, ...others) {
		return Object.assign(this.getDefaultTypeEmpty(original), original, ...others);
	}

	static mixObjectsOnlyKeys(original, keys, ...others) {
		return Object.assign(this.getDefaultTypeEmpty(original), original, ...others.map(other => this.getOnlyKeys(other, keys)));
	}

	static removeDuplications(original) {
		return this.getKeys(original).reduce((result, key) => {
			const item = original[key];
			if(this.getValues(result).indexOf(item) === -1) {
				result[key] = original[key];
			}
			return result;
		}, this.getDefaultTypeEmpty(original));
	}

	static flatten() {

	}

	static setOriginal(original) {
		this.original = original;
	}

	static map(original, keyValueMapper) {
		return this.getKeys(original).reduce((result, key, index) => {
			const item = original[key];
			const partialOutput = keyValueMapper(item, key, index, result, original);
			if(typeof partialOutput === "object" && Object.keys(partialOutput).length === 2 && (Object.keys(partialOutput).indexOf("$key") !== -1) && (Object.keys(partialOutput).indexOf("$value") !== -1)) {
				result = this.mixObjects(result, partialOutput);
			} else if(typeof partialOutput === "undefined") {

			} else {
				result[key] = partialOutput;
			}
			return result;
		}, this.getDefaultTypeEmpty(original));
	}

	static reduce(original, keyValueReducer, init = {}) {
		return this.getKeys(original).reduce((result, key, index) => {
			const item = original[key];
			const result2 = keyValueReducer(result, item, key, index);
			if(typeof result2 === "undefined") {

			} else {
				return result2;
			}
			return result;
		}, this.getDefaultTypeEmpty(original));

	}

	static filter(original, keyValueFilterer) {
		return this.getKeys(original).reduce((result, key, index) => {
			const item = original[key];
			const isAccepted = keyValueFilterer(result, item, key, index);
			if(isAccepted === true) {
				result[key] = original[key];
			}
			return result;
		}, this.getDefaultTypeEmpty(original));
	}

	static iterate(original, keyValueIterator) {
		return this.getKeys(original).reduce((result, key, index) => {
			const item = original[key];
			keyValueIterator(item, key, index);
			return result;
		}, this.getDefaultTypeEmpty(original));
	}

	static modify(original, keyValueModificator) {
		return keyValueModificator(Object.assign(this.getDefaultTypeEmpty(original), original));
	}

	static concatOperations(original, ops = []) {
		let result = original;
		ops.forEach(op => {
			if(!(op[0] in this)) {
				throw new Error("Operation not found:" + op[0]);
			}
			if(typeof this[op[0]] !== "function") {
				throw new Error("Not found as operation:" + this[op[0]]);
			}
			result = this[op[0]](result, ...op.slice(1));
		});
		return result;
	}

	static groupRawBy(original, ...fields) {
		return groupArray(original, ...fields);
	}

}

module.exports = CollectionManager;