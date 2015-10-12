function outputFile(fs, fd, reader) {
	var strStart = "_include_start_";
	var strEnd = "_include_end_";
	var isInOutput = false;
	// console.log(reader);
	while (true) {
		if (reader.hasNextLine()) {
			var line = reader.nextLine();
			if (isInOutput) {
				if (line.indexOf(strEnd) > -1) {
					isInOutput = false;
					continue;
				}
				fs.writeSync(fd, line, 0, "utf-8");
			}
			else {
				if (line.indexOf(strStart) > -1) {
					isInOutput = true;
				}
				continue;
			}
			// console.log(line);
		}
		else {
			var line = reader.getLastBuffer();
			console.log(line);
			break;
		}
	}

}

var assert = require('assert');
var sys = require('sys');
var flr = require('./fileLineReader');
var fs = require('fs');

var path = "../test/pokerchipTest/pokerchipTest/";
var files = ["Chip.cs", "Field.cs", "CompDist.cs"];

var fd = fs.openSync("./test.txt", "w");
fs.closeSync(fd);
fd = fs.openSync("./test.txt", "a");

fs.writeSync(fd, "#region\r", 0, "utf-8");

for (var i = 0; i < files.length; i++) {

	var fileName = path + files[i];
	var stat = fs.statSync(fileName);
	console.log(stat);


	var reader = new flr.FileLineReader(fileName, stat.size + 8);

	outputFile(fs, fd, reader );
}
fs.writeSync(fd, "#endregion\r", 0, "utf-8");

fs.closeSync(fd);


