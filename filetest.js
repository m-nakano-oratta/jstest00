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
				fs.writeSync(fd, line, 0, encoing);
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
var encoing = "utf-8";
var outputName = "./test.txt";
var assert = require('assert');
var sys = require('sys');
var flr = require('./fileLineReader');
var fs = require('fs');
// 相対パス
var path = "../test/pokerchipTest/pokerchipTest/";
// 処理したいファイル
var files = ["Chip.cs", "Field.cs", "CompDist.cs"];
// ファイルを消す。もっといい方法がありそう
var fd = fs.openSync(outputName, "w");
fs.closeSync(fd);
// 追記モード
fd = fs.openSync(outputName, "a");
// C#のIDE専用
fs.writeSync(fd, "#region\r", 0, encoing);

for (var i = 0; i < files.length; i++) {

	var fileName = path + files[i];
	var stat = fs.statSync(fileName);
	console.log(stat);


	var reader = new flr.FileLineReader(fileName, stat.size + 8);

	outputFile(fs, fd, reader );
}
// C#のIDE専用
fs.writeSync(fd, "#endregion\r", 0, encoing);

fs.closeSync(fd);


