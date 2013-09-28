var vbox = require('vbox');

var name = 'IE7 - WinXP';
var machine = new vbox.Box(name);

machine
	.vrde('on')
	.vrdeport(5001)
	.start(function(err){

	});
