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

router.get('/tree-info/:treeId', (req, res) => {
	var tree_id = req.params.treeId;
	trees_model.getTreeInfo(tree_id)
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
});

/* END OF ROUTES */

module.exports = router;