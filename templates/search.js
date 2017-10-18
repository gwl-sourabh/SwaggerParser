const getType = require('../utilities/utility').getType;

let searchTemplate = function (module, numCols, path, config, definition) {
	let specifications = {
		numCols: numCols,
		useTimestamp: true,
		objectName: '',
		groups: [{
			"name": "",
			"label": module + ".search.title",
			"fields": []
		}],
		result: {
			header: [],
			values: [],
			resultPath: ""
		}
	};
	let fields = {};
	let parameterConfig = config["post"].parameters;
	for(let i=0; i<parameterConfig.length; i++) {
		if(!/requestInfo|tenantId|pageSize|pageNumber|sortResult/.test(parameterConfig[i].$ref)) {
			let splitArr = parameterConfig[i].$ref.split("/");
			let paramKey = splitArr[splitArr.length-1];

			specifications.groups[0].fields.push({
				"name": paramKey,
				"jsonPath": paramKey,
				"label": module + ".create" + paramKey,
				"pattern": definition[paramKey].pattern,
				"type": definition[paramKey].enum ? "singleValueList" : getType(definition[paramKey].type),
				"isRequired": definition[paramKey].required,
				"isDisabled": definition[paramKey].readOnly ? true : false,
				"defaultValue": definition[paramKey].default,
				"maxLength": definition[paramKey].maxLength,
				"minLength": definition[paramKey].minLength,
				"patternErrorMsg": module + ".create.field.message." + paramKey
			});
		}
	}

	return specifications;
}

module.exports = searchTemplate;