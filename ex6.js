// Skriv ett interaktivt program som frågar användaren efter en fil, vars innehåll ska skrivas ut.

// vilka moduler behövs?
// be användaren om ett filnamn
// läs in filens innehåll
// skriv ut innehållet på konsolen

const fs = require('fs');
const stdin = process.openStdin();

let readFileNameFromStdin = input => {
	let fileName = input.toString().trim();
	console.log(`Du har skrivit: "${fileName}"`);
	fs.readFile('./' + fileName, 'utf8', (err, data) => {
		if( err ) {
			console.log('Det gick inte att läsa från filen. Har du skrivit rätt? Försök igen!');
		} else {
			let contents = data.toString();
			console.log(data);
			stdin.removeListener('data', readFileNameFromStdin);
		}
	})
}
stdin.addListener('data', readFileNameFromStdin)


//
