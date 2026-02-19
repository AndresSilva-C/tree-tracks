const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

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

router.post('/add-tree', (req, res) => {
	var tree_id = req.body.tree_id;
	var username = req.body.username;
	trees_model.addTree(tree_id, username)
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
});

router.post('/remove-tree', (req, res) => {
	var tree_id = req.body.tree_id;
	var username = req.body.username;
	trees_model.removeTree(tree_id, username)
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
});

router.post('/favorites', (req, res) => {
	var username = req.body.username;
	trees_model.getFavoritesList(username)
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
});

router.post('/register', async (req, res) => {
	const data = req.body;
	// Check if a user with the given username already exists
	const existingUser = await trees_model.getUser(data.username);
	if (existingUser.length > 0) {
		return res.status(400).send({
			success: false,
			message: "Username already exists. Please try a new one.",
		});
	}
	// Hash the password
	const saltRounds = 10;
	const hashedPassword = await bcrypt.hash(data.password, saltRounds);

	trees_model.registerUser(data.username, hashedPassword)
	.then(response => {
		// create JWT token
		const token = jwt.sign(
			{
				userId: response[0]._id,
				username: data.username,
			},
			'secret', // "RANDOM-TOKEN"
			{ expiresIn: "24h" }
		);
		res.status(200).send({
			success: true,
			message: "Registration successful",
			username: data.username,
			token: token,
		});
	})
	.catch(error => {
		res.status(500).send(error);
	});
});

router.post('/login', async (req, res) => {
	const data = req.body;
	// Check if a user with the given username exists
	const existingUser = await trees_model.getUser(data.username);
	if (existingUser.length <= 0) {
		return res.status(400).send({
			success: false,
			message: "User does not exist",
		});
	}
	// Compare passwords
	bcrypt.compare(data.password, existingUser[0].password)
	.then((result) => {
		if (!result) {
			return res.status(400).send({
				success: false,
				message: "Invalid password",
				error,
			});
		}
		// create JWT token
		const token = jwt.sign(
			{
				userId: existingUser._id,
				username: existingUser.username,
			},
			'secret', // "RANDOM-TOKEN"
			{ expiresIn: "24h" }
		);
		// return success response
		res.status(200).send({
			success: true,
			message: "Login successful",
			username: data.username,
			token: token,
		});
	})
	// catch error if password does not match
	.catch((error) => {
		res.status(400).send({
			message: `Invalid password for username '${data.username}'`,
			error,
		});
	});
});

/* END OF ROUTES */

module.exports = router;