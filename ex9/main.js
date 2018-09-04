// 9a Skapa en webbserver på localhost, som skickar strängen "hello world" när en klient (webbläsare) skickar en request till den.

// vilka moduler behöver vi?
// starta webbserver
// lyssna på requests till webbservern och skicka response

const http = require('http');
let port = 3000;

let server = http.createServer();
server.addListener('request', (request, response) => {
	console.log(`Det kom ett request med url=${request.url} och method=${request.method}`);
	response.write('Hello world');
	response.end();
})
server.listen(port);
console.log('Server listening on port ' + port);


//
