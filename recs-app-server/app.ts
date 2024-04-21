const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { readFile, writeFile } = require('fs').promises;
const { resolve } = require('path');
const http = require('http');
const WS = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WS.Server({ server });

const PORT = process.env.PORT || 3001;
const FILE_PATH = resolve('./recs.json');

app.use(cors());

app.get('/recs', (req, res) => {
	readFile(FILE_PATH, 'utf8').then((data) => {
		res.send(data);
	});
});

// Handle WebSocket connections
wss.on('connection', (ws) => {
	console.log('Client connected');

	// Read JSON file and send it to client
	readFile(FILE_PATH, 'utf8').then((data) => {
		ws.send(data);
	});
});

app.post('/recs-write', (req, res) => {
	let body = '';
	req.on('data', (chunk) => {
		body += chunk;
	});
	req.on('end', () => {
		readFile(FILE_PATH, 'utf8').then((data) => {
			if (!data) {
				data = '[]';
			}
			const recs = JSON.parse(data);
			const newRec = JSON.parse(body);
			recs.push(newRec);
			writeFile(FILE_PATH, JSON.stringify(recs));
			wss.clients.forEach((client) => {
				if (client.readyState == WS.OPEN) {
					client.send(
						JSON.stringify({
							type: 'dataChange',
							newData: newRec,
							wholeData: recs,
						})
					);
				}
			});
			res.send('Success');
		});
		// fs.writeFile('recs.json', body, (err) => {
		// 	if (err) {
		// 		console.error(err);
		// 		res.status(500).send('Internal server error');
		// 		return;
		// 	}
		// 	res.send(body);

		// 	// Update ws clients with new data
		// 	fs.readFile('recs.json', (err, data) => {
		// 		if (err) {
		// 			console.error('Error reading JSON file:', err);
		// 			res.status(500).send('Internal server error');
		// 			return;
		// 		}
		// 		wss.clients.forEach((client) => {
		// 			if (client.readyState === WS.OPEN) {
		// 				client.send(
		// 					JSON.stringify({
		// 						type: 'dataChange',
		// 						newData: body,
		// 						wholeData: data,
		// 					})
		// 				);
		// 			}
		// 		});
		// 	});
		// });
	});
});

// Start the server
server.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
