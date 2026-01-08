
const express = require('express');
const cors = require("cors");
const app = express();
const port = 3001;

// Allow JSON responses
app.use(express.json());

// Allow requests from React
app.use(cors());
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');//'http://localhost:5173');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
	next();
});

app.listen(port, () => {
	console.log(`TreeTracks listening on port ${port}`);
});