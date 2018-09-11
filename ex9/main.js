// 9a Skapa en webbserver på localhost, som skickar strängen "hello world" när en klient (webbläsare) skickar en request till den.

// vilka moduler behöver vi?
// starta webbserver
// lyssna på requests till webbservern och skicka response

// 9b Uppdatera webbservern så att den i stället för en sträng skickar en HTML-fil som en ström.

// 9c Uppdatera webbserven så att den kan göra olika saker beroende på vilken URL som efterfrågas.
// Om URL är '/' så ska startsidan skickas.
// Om URL är '/upper/' så ska startsidan skickas, men alla bokstäver ska vara stora. (Tips: toUpperCase().)
// Om URL är något annat så ska du skicka en annan sida, som visar felmeddelandet 404.


// 9d* Template - uppdatera webbservern så att den byter ut alla förekomster av { } och försöker utvärdera dem, som Vue eller React. Eller hitta på din egen syntax! Tips: Node har en "chunk size" på 64kB så du behöver inte ta hänsyn till vad som händer nära "gränsen" på varje bit data. Exempel:
// <p>Number: { 5 + 5 } </p> → <p>Number: 10 </p>


const http = require('http');
const fs = require('fs');
let port = 3001;
const { Transform } = require('stream');

let createShoutingStream = () => new Transform({
	transform(chunk, encoding, callback) {
		this.push(chunk.toString().toUpperCase());
		callback();
	}
});
let createTemplateStream = () => new Transform({
	transform(chunk, encoding, callback) {
		let text = chunk.toString();
		// substring och indexOf, (regex), split
		// console.log('template: text is "'+text+'"');
		let pieces = text.split('{');  // 'hej {user}!'
		for( let i=1; i<pieces.length; i++ ) {
			let bracketEnd = pieces[i].indexOf('}'); // 'user}!'
			let expression = pieces[i].substring(0, bracketEnd);
			let rest = pieces[i].substring(bracketEnd + 1);
			pieces[i] = eval(expression) + rest;
			console.log('piece #'+i, pieces[i]);
		}
		text = pieces.join('');
		console.log('template: new text is "'+text+'"')
		this.push(text);
		callback();
	}
});

let server = http.createServer();
server.addListener('request', (request, response) => {
	console.log(`Det kom ett request med url=${request.url} och method=${request.method}`);
	let file = '404.html';
	if( request.url === '/' || request.url === '/upper/' )
		file = './index.html';
	let stream = fs.createReadStream(file);
	let shoutingStream = createShoutingStream();
	let templateStream = createTemplateStream();
	// stream = stream.pipe(shoutingStream);
	if( request.url === '/' || request.url === '/upper/' )
		stream = stream.pipe(templateStream);
	if(  request.url === '/upper/')
		stream = stream.pipe(shoutingStream);
	stream.pipe(response);
	// response.end();
	// stream.pipe(shoutingStream).pipe(response);
})
server.listen(port);
console.log('Server listening on port ' + port);


//
