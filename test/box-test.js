var buster = require('buster');
var assert = buster.referee.assert;
var async = require('async');
var vbox = require('../lib/vbox');
var Box = require('../lib/box');
var testBox = 'IE7 - WinXP';

buster.testCase('Box', {

	setUp: function() {
		this.timeout = 5000;
		this.box = new Box(testBox);
	},

	tearDown: function(done) {
		this.box.poweroff(function(err){
			done();
		});
	},

	'start headless vm': function(done) {
		this.box.start(function(err){
			assert.equals(err, null);
			done();
		});
	},

	'power off vm': function(done) {
		var self = this;

		async.waterfall([
			function(cb){
				self.box.start(function(err){
					cb(err);
				});
			},
			function(cb){
				vbox.list(function(err, vms){
					if (!err && vms.indexOf(testBox) === -1) {
						err = new Error(testBox + ' isn\'t running');
					}
					cb(err);
				});
			},
			function(cb){
				self.box.poweroff(function(err){
					cb(err);
				});
			}, 
			function(cb) {
				vbox.list(function(err, vms){
					if (!err && vms.indexOf(testBox) > -1) {
						err = new Error(testBox + ' is still running');
					}
					cb(err);
				});
			}
		], function(err, result){
			assert.equals(err, null);
			done();
		});
	},

	'save machine state': function(done) {
		var self = this;

		async.waterfall([
			function(cb){
				self.box.start(function(err){
					cb(err);
				});
			},
			function(cb){
				vbox.list(function(err, vms){
					if (!err && vms.indexOf(testBox) === -1) {
						err = new Error(testBox + ' isn\'t running');
					}
					cb(err);
				});
			},
			function(cb){
				self.box.savestate(function(err){
					cb(err);
				});
			}, 
			function(cb) {
				vbox.list(function(err, vms){
					if (!err && vms.indexOf(testBox) > -1) {
						err = new Error(testBox + ' is still running');
					}
					cb(err);
				});
			},
			function(cb) {
				self.box.info(function(err, data){
					if (!err && !/State:(.*)saved/.test(data)) {
						err = new Error(testBox + ' is not paused'); 
					}

					cb(err);
				});
			}
		], function(err, result){
			assert.equals(err, null);
			done();
		});
	},

	'should pause vm': function(done) {
		var self = this;

		async.waterfall([
			function(cb){
				self.box.start(function(err){
					cb(err);
				});
			},
			function(cb){
				vbox.list(function(err, vms){
					if (!err && vms.indexOf(testBox) === -1) {
						err = new Error(testBox + ' isn\'t running');
					}
					cb(err);
				});
			},
			function(cb){
				self.box.pause(function(err){
					cb(err);
				});
			}, 
			function(cb) {
				self.box.info(function(err, data){
					if (!err && !/State:(.*)paused/.test(data)) {
						err = new Error(testBox + ' is not paused'); 
					}

					cb(err);
				});
			}
		], function(err, result){
			assert.equals(err, null);
			done();
		});
	}
	/*,

	'clone vm': function() {

	},

	'change RDP port': function() {

	},*/
});
