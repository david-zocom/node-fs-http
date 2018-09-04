// 7 Skriv ett interaktivt program där användaren både kan läsa innehållet från en fil och skriva en sträng, som ska sparas till en fil. Läsning och skrivning ska vara i två olika filer, som du inkluderar med require.
const { read } = require('./read.js')
// const read = require('./read.js').read
const getTextAndWrite = require('./write.js')

read('./file.txt', text => {
	getTextAndWrite('./file2.txt', () => {
		console.log('Done!');
	})
})
