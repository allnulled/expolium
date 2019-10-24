const { expect } = require("chai");

class CheckManager {

	static check(...args) {
		return new CheckManager(...args);
	}

	constructor(options = {}) {
		this.subject = undefined;
		Object.keys(options).forEach(prop => this[prop] = options[prop]);
	}
	
	that(subject) {
		this.subject = subject;
		return this;
	}

	isObject() {
		return typeof(this.subject) === "object";
	}

	isInteger() {
		return Number.isInteger(this.subject);
	}

	isNumber() {
		return typeof(this.subject) === "number";
	}

	isUndefined() {
		return typeof(this.subject) === "undefined";
	}

	isArray() {
		return Array.isArray(this.subject);
	}

	isNull() {
		return this.subject === null;
	}

	isBoolean() {
		return typeof this.subject === "boolean";
	}

	isFunction() {
		return typeof this.subject === "function";
	}

	is(item) {
		return this.subject === item;
	}

	isLike(item) {
		return this.subject == item;
	}

	isNot(item) {
		return this.subject !== item;
	}

	isNotLike(item) {
		return this.subject != item;
	}

	isDeeply(item) {
		try {
			expect(this.subject).to.deep.equal(item);
		} catch(error) {
			return false;
		}
		return true;
	}

	isOfType(typeStr) {
		return typeof(this.subject) === typeStr;
	}

	isNotOfType(typeStr) {
		return typeof(this.subject) !== typeStr;
	}

	isMoreThan(x) {
		return this.subject > x;
	}

	isMoreOrLike(x) {
		return this.subject >= x;
	}

	isLessThan(x) {
		return this.subject < x;
	}

	isLessOrLike(x) {
		return this.subject <= x;
	}

	containsKey(key) {
		return Object.keys(this.subject).indexOf(key) !== -1;
	}

	containsValue(value) {
		return Object.values(this.subject).indexOf(value) !== -1;
	}

	contains(item) {
		return this.subject.indexOf(item) !== -1;
	}

}

module.exports = CheckManager;