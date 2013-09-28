var util = require('util');

function fail(patterns, subject, defaultErrorMsg) {
	var pattern, key, message, regExp;

	if (!util.isArray(patterns)) {
		patterns = [patterns];
	}

	for (var i = 0, len = patterns.length; i < len; i++) {
		pattern = patterns[i];

		if (typeof(pattern) === 'object') {
			// Get error message {pattern:errorMsg}
			message = Object.getOwnPropertyNames(pattern).map(function(key){
				// Set regExp from pattern {pattern:errorMsg}
				regExp = new RegExp(key);
				return pattern[key];
			})[0];
		} else {
			message = defaultErrorMsg;
			regExp = new RegExp(pattern);
		}
		
		if (regExp.test(subject)){
			return new Error(message);
		}
	}

	return null;
}

module.exports = fail;