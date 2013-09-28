var spawn = require('child_process').spawn;

function createSpawn(command) {
	return function(args, options, cb) {
		var child;
		var encoding;
		var _stderr = [];
		var _stdout = [];
		var exited = false;

		if (typeof args === 'string') {
			//add command
		}

		if (typeof options === 'function') {
			cb = options;
		} else if(options) {
			encoding = options.encoding || 'utf8';
		}

		function onClose(err) {
			var stderr;
			var stdout;

			if (exited) return;

			if (err) {
				cb(err);
			} else {
				// Merge chunks
				if (encoding === 'utf8') {
					stderr = _stderr.join('');
					stdout = _stdout.join('');
				} else {
					stderr = Buffer.concat(_stderr);
					stdout = Buffer.concat(_stdout);
				}
				// Pass stdout to callback if no error occured
				if (_stderr.length === 0) {
					cb(null, stdout);
				}
				// If stderr has data, wrap it in an Error object and pass to callback
				else {
					cb(new Error(stderr));
				}
			}

			exited = true;
		}

		child = spawn(command, args);
		child.stdout.setEncoding(encoding);
		child.stderr.setEncoding(encoding);

		child.stdout.on('data', function(data){
			_stdout.push(data);
		});

		child.stderr.on('data', function(data){
			_stderr.push(data);
		});

		child.on('close', onClose);
		child.on('error', onClose);

		return child;
	}
}

exports.run = function(){
	return createSpawn();
}

exports.command = function(command) {
	return createSpawn(command);
}
