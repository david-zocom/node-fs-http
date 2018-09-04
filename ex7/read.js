const fs = require('fs')

function read(fileName, callback) {
	let readStream = fs.createReadStream(fileName);
	let contents = '';
	readStream.addListener('data', data => {
		console.log('Vi läste ett chunk från strömmen.');
		contents += data.toString();
	})
	readStream.addListener('end', () => {
		console.log('Detta står i filen: ' + contents);
		callback(contents);
	})

	/*fs.readFile(fileName, 'utf8', (err, text) => {
		if( err ) {
			console.log('Kunde inte hitta filen.');
		} else {
			console.log('Detta står i filen: ' + text);
			callback(text);
		}
	});*/
}
module.exports = {
	read: read
};




//
