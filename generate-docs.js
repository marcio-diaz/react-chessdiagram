var fs = require('fs');
var path = require('path');
var generateMarkdown = require('./generateMarkdown.js');

var src = './src';
var reactDocs = require('react-docgen');

fs.readdir('./src', function (err, files) {
	if (err) {
		throw err;
	}

	var jsfiles = files.filter(function(file) {
		return path.extname(file) === '.js' || path.extname(file) === '.jsx';
	});

	jsfiles.forEach(function (file, index) {
		fs.readFile(path.join('./src/',file), 'utf8', function (err,data) {
			if (err)
				return;
			var componentName = path.basename(file, path.extname(file));
			var componentNameCapitalized = componentName[0].toUpperCase() + componentName.slice(1);
			var componentInfo = reactDocs.parse(data);

			console.log(generateMarkdown(componentNameCapitalized, componentInfo));
		});
	});
});

