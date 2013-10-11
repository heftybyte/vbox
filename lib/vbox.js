var exec = require('child_process').exec;

function VBox() {

}

VBox.version = function() {

}

/**
 * Gets a list of running vms
 * @param  {Function} cb callback for result
 */
VBox.list = function(cb) {
	exec('vboxmanage list runningvms', function(err, stdout, stderr) {
		var vmList = [];

		if (stdout.length) {
			// Extract the vm names
			stdout = stdout.match(/"(.*?)"/g);

			// Remove extra quotes
			stdout.forEach(function(vm){
				vmList.push(vm.replace(/"/g, ''));
			});
		}

		cb(err, vmList);
	});
}

VBox.createVM = function() {

}

VBox.registerVM = function() {

}

VBox.unregisterVM = function() {

}

VBox.import = function() {

}

VBox.export = function() {

}

/**
 * Create a clone of a VM
 * @param {Function} cb callback for result
 */
VBox.cloneVM = function() {
	
}

module.exports = VBox;
