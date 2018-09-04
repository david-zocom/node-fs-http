const fs = require('fs')
const stdin = process.openStdin();

function getTextAndWrite(fileName, callback) {
	console.log('Skriv in en text, som ska sparas i filen.');
	let stdinCallback = input => {
		let text = input.toString();
		let writeStream = fs.createWriteStream(fileName, { flags: 'a' });
		writeStream.write(text, 'utf8', callback);
		stdin.removeListener('data', stdinCallback);
		//fs.writeFile(fileName, text, 'utf8', callback);
	};
	stdin.addListener('data', stdinCallback)
}


module.exports = getTextAndWrite;
