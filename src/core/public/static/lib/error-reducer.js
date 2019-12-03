class ErrorReducer {

	constructor(reducers = []) {
		this.allReducers = reducers;
	}

	reduce(error, exceptions = []) {
		return this.allReducers.reduce((out, reducer) => {
			const reduction = reducer(error);
			if(typeof reduction !== "undefined") {
				out = reduction;
			}
			return out;
		}, "Undefined error");
	}

}

window.ErrorReducer = ErrorReducer;
window.errorReducer = new ErrorReducer([

	(error) => {
		if(typeof error === "object") {
			// return JSON.stringify(error);
			if(error.name === "SequelizeUniqueConstraintError") {
				return `${error.parent.sqlMessage} [${error.parent.errno}/${error.parent.sqlState}]`
			}
		}
	},

	(error) => {
		if(typeof error === "object") {

		}
	},
	
	(error) => {
		if(typeof error === "object") {

		}
	},
	
	(error) => {
		if(typeof error === "object") {

		}
	},

]);