// 9a Skapa en webbserver på localhost, som skickar strängen "hello world" när en klient (webbläsare) skickar en request till den.

// vilka moduler behöver vi?
// starta webbserver
// lyssna på requests till webbservern och skicka response

// 9b Uppdatera webbservern så att den i stället för en sträng skickar en HTML-fil som en ström.

// 9c Uppdatera webbserven så att den kan göra olika saker beroende på vilken URL som efterfrågas.
// Om URL är '/' så ska startsidan skickas.
// Om URL är '/upper/' så ska startsidan skickas, men alla bokstäver ska vara stora. (Tips: toUpperCase().)
// Om URL är något annat så ska du skicka en annan sida, som visar felmeddelandet 404.


const http = require('http');
const fs = require('fs');
let port = 3000;
const { Transform } = require('stream');
const shoutingStream = new Transform({
	transform(chunk, encoding, callback) {
		this.push(chunk.toString().toUpperCase());
		callback();
	}
});

let server = http.createServer();
server.addListener('request', (request, response) => {
	console.log(`Det kom ett request med url=${request.url} och method=${request.method}`);
	if( request.url === '/' ) {
		let readStream = fs.createReadStream('./index.html');
		readStream.pipe(response);
	}
	else if(  request.url === '/upper/') {
		let readStream = fs.createReadStream('./index.html');
		readStream.pipe(shoutingStream).pipe(response);
	}
	else {
		let readStream = fs.createReadStream('./404.html');
		readStream.pipe(response);
	}
	// response.end();
})
server.listen(port);
console.log('Server listening on port ' + port);


//
