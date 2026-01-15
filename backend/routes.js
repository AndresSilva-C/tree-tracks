const express = require('express');
const router = express.Router();

const trees_model = require('./model')

/* BEGINNING OF ROUTES */

router.get('/', (req, res) => {
	trees_model.getTrees()
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
});

/* END OF ROUTES */

module.exports = router;