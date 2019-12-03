class SqlItemToFormBuilderAdapter {

	static adapt(sqlItem, tableDefinition) {
		const out = [];
		// @TODO: take sql results and give formbuilder data
		const allColumns = Object.keys(tableDefinition);
		allColumns.forEach(column => {
			const colType = tableDefinition[column];
			const colData = sqlItem[column] || null;
			const colForm = Object.keys(colType).filter(key => key.startsWith("__form_")).reduce((out, key) => {
				out[key.replace("__form_", "")] = colType[key];
				return out;
			}, {});
			colForm.name = column;
			colForm.value = colData;
			//colForm.type = colType;
			out.push(colForm);
		});
		// console.log("sqlItem", sqlItem);
		// console.log("tableDefinition", tableDefinition);
		// console.log("out", out);
		return out;
	}

}

module.exports = SqlItemToFormBuilderAdapter