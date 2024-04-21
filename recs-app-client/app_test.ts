const axios = require('axios');

const url = 'http://localhost:3001/recs';

// Test post request
axios
	.post('http://localhost:3001/recs-write', JSON.stringify({ test: 'test' }))
	.then((res) => {
		console.log(res.data);
	})
	.catch((err) => {
		console.error(err);
	});
