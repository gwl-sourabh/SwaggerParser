function getType(type) {
	switch(type) {
		case 'integer': 
		case 'float': 
		case 'double': 
		case 'long': return 'number';
		case 'string': return 'text';
		case 'boolean': return 'radio';
		case 'date': 'datePicker';
		default: return '';
	}
}

function getTitleCase(field) {
    if (field) {
        var newField = field[0].toUpperCase();
        for (let i = 1; i < field.length; i++) {
            if (field[i - 1] != " " && field[i] != " ") {
                newField += field.charAt(i).toLowerCase();
            } else {
                newField += field[i]
            }
        }
        return newField;
    } else {
        return "";
    }
}

exports.getTitleCase = getTitleCase;
exports.getType = getType;
