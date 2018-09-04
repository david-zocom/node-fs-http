const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
	console.log(`Webbservern har tagit emot ett request med url=${req.url} och params=`, req.params);
	console.log('query:', req.query);
	res.send('More interesting?');
})
app.get('/params/:x', (req, res) => {
	console.log('Webbservern har tagit emot request till /PARAMS med parametern: ', req.params);
	res.send('Du skrev ' + req.params.x)
})
app.use( express.static(__dirname + '/public') );

app.listen(port, () => {
	console.log('Webbservern lyssnar på port ' + port);
})
