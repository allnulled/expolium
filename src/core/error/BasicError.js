class BasicError extends Error {
	handle() {
		console.log("[!] Error: ", this.name, this.message, this.info || {});
	}
}

module.exports = BasicError;