var exec = require('child_process').exec;
var fail = require('./fail');

function Box(name) {
	this.name = name;
}

/**
 * Return a list of information about the vm
 * @method  info
 * @param  {Function} cb callback for result
 */
Box.prototype.info = function(cb) {
	exec('vboxmanage showvminfo "' + this.name + '"', function(err, stdout, stderr){
		cb(err, stdout);
	});
}

/**
 * Start the virtual machine associated with the name of this Box.
 * @method  start
 * @param  {Function} cb callback for result
 */
Box.prototype.start = function(cb) {
	var errorPatterns = {
		'already locked by a session': 'this machine is already running',
	}

	exec('vboxmanage startvm "' + this.name + '" --type headless', function(err, stdout, stderr){
		if (err) {
			err = fail(errorPatterns, err.message);
		}
		cb(err);
	});
}

/**
 * Pause the running virtual machine associated with the name of this Box.
 * @method  pause
 * @param  {Function} cb callback for result
 */
Box.prototype.pause = function(cb) {
	exec('vboxmanage controlvm "' + this.name + '" pause', function(err, stdout, stderr){
		cb(err);
	});
}


/**
 * Turns off the virtual machine. Virtualbox passes the progress to the stderr
 * @method  poweroff
 * @param  {Function} cb callback for result
 */
Box.prototype.poweroff = function(cb) {
	var errorPatterns = {
		'An unexpected process \((.*)\) has tried to lock the machine': 'problem shutting down machine',
		'Invalid machine state: Starting': 'this machine is already in use'
	}

	exec('vboxmanage controlvm "' + this.name + '" poweroff', function(err, stdout, stderr){
		if (err) {
			err = fail(errorPatterns, err.message);
		} 

		cb(err);
	});
}

/**
 * Saves the virutal machine state
 * @method savestate
 * @param  {Function} cb callback for result
 */
Box.prototype.savestate = function(cb) {
	exec('vboxmanage controlvm "' + this.name + '" savestate', function(err, stdout, stderr){
		cb(err);
	});
}

/**
 * Take a screenshot of the VM in PNG format
 * @method screenshot
 * @param {Function} cb callback
 */
Box.prototype.screenshot = function(cb) {

}

Box.prototype.hdInfo = function() {

}


Box.prototype.vrde = function(state, cb) {
	exec('vboxmanage modifyvm "' + this.name + '" --vrde "' + state + '"', function(err, stdout, stderr){
		cb(err);
	});
}

Box.prototype.vrdeport = function(port, cb) {
	exec('vboxmanage modifyvm "' + this.name + '" --vrdeport "' + port + '"', function(err, stdout, stderr){
		cb(err);
	});
}


Box.prototype.resume = function(cb) {

}

Box.prototype.reset = function(cb) {

}

Box.prototype.resumeState = function(state, cb) {

}

Box.prototype.discardState = function(state, cb) {

}

Box.prototype.vrdevideochannelquality = function(cb) {

}

Box.prototype.bandwidth = function() {

}

module.exports = Box;
