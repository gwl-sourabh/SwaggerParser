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

exports.getType = getType;
