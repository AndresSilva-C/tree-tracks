const express = require('express');
const cors = require("cors");
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, '../frontend/dist')));

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

const routes = require("./routes");
app.use("/api/v1/routes/", routes);

app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

app.listen(port, "0.0.0.0", () => {
        console.log(`TreeTracks listening on port ${port}`);
});
