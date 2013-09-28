var buster = require('buster');
var assert = buster.referee.assert;
var util = require('util');
var fail = require('../lib/fail');

buster.testCase('fail', {
	'should match pattern and return default error message': function() {
		var defaultErrorMsg = 'An error occured';
		var result = fail('test', 'test', defaultErrorMsg);
		assert(util.isError(result));
		assert.equals(defaultErrorMsg, result.message);
	},

	'should match pattern and return custom error message': function() {
		var errors = {
			'Not found': 'It was not found'
		};
		var result = fail(errors, 'Not found');
		assert(util.isError(result));
		assert.equals('It was not found', result.message);
	},

	'should match object pattern from array': function() {
		var errors = [
			{'Invalid file size': 'The size is not correct'},
			{'Not found': 'It was not found'},
			{'Doesn\'t exist': 'It does not exist'}
		];
		var result = fail(errors, 'Not found');
		assert(util.isError(result));
		assert.equals('It was not found', result.message);
	},

	'should match pattern from array': function() {
		var defaultErrorMsg = 'An error occured';
		var errors = ['Invalid file size','Not found','Doesn\'t exist'];
		var result = fail(errors, 'Doesn\'t exist', defaultErrorMsg);
		assert(util.isError(result));
		assert.equals(defaultErrorMsg, result.message);
	},

	'should match pattern and use default from mixed array': function() {
		var errors = [
			{'Invalid file size': 'The size is not correct'},
			{'Not found': 'It was not found'},
			{'Doesn\'t exist': 'It does not exist'},
			'SNAFU'
		];
		var result = fail(errors, 'SNAFU', 'GG');
		assert(util.isError(result));
		assert.equals('GG', result.message);
	},

	'should match pattern and use custom from mixed array': function() {
		var errors = [
			{'Invalid file size': 'The size is not correct'},
			{'Not found': 'It was not found'},
			{'Doesn\'t exist': 'It does not exist'},
			'SNAFU'
		];
		var result = fail(errors, 'Not found', 'GG');
		assert(util.isError(result));
		assert.equals('It was not found', result.message);
	},
	
	'should return null': function() {
		var errors = {
			'Doesn\'t exist': 'It does not exist'
		};
		var result = fail(errors, 'Not found', 'An error occured');
		assert.equals(null, result);
	}
})