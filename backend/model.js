require('dotenv').config()

const Pool = require('pg').Pool
const pool = new Pool({
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	host: process.env.PG_HOST,
	database: process.env.PG_DATABASE,
	port: process.env.PG_PORT,
});

/* DB OPERATIONS START */

//get all tree listing info from our database
async function getTrees() {
	try {
		return await new Promise(function (resolve, reject) {
			pool.query("SELECT taxon, common_name, map_link, iucn FROM trees", (error, results) => {
				if (error) {
					reject(error);
				}
				if (results && results.rows) {
					resolve(results.rows);
				} else {
					reject(new Error("No results found"));
				}
			});
		});
	} catch (error) {
		console.error(error);
		throw new Error("Error in database routine 'getTrees'");
	}
};

//get all info about a specific tree
async function getTreeInfo(tree_id) {
	try {
		return await new Promise(function (resolve, reject) {
			pool.query("SELECT * FROM trees WHERE position($1 in map_link) > 0", [tree_id], (error, results) => {
				if (error) {
					reject(error);
				}
				if (results && results.rows) {
					resolve(results.rows);
				} else {
					reject(new Error("No results found"));
				}
			});
		});
	} catch (error) {
		console.error(error);
		throw new Error("Error in database routine 'getTreeInfo'");
	}
};

// register a new user
async function registerUser(username, password) {
	try {
		return await new Promise(function (resolve, reject) {
			pool.query("INSERT INTO users (username, password, favorites) VALUES ($1, $2, $3) RETURNING *",
				[username, password, []], 
				(error, results) => {
				if (error) {
					reject(error);
				}
				if (results && results.rows) {
					resolve(JSON.stringify({success: true, results: results.rows[0]}));
				} else {
					reject(new Error("Error in database routine 'registerUser'"));
				}
			});
		});
	} catch (error) {
		console.error(error);
		throw new Error("Error in database routine 'registerUser'");
	}
};

// find and return the user in the users table with the given username
async function getUser(username) {
	try {
		return await new Promise(function (resolve, reject) {
			pool.query("SELECT * FROM users WHERE username = $1", [username], (error, results) => {
				if (error) {
					reject(error);
				}
				if (results && results.rows) {
					resolve(results.rows);
				} else {
					reject("NONE");	// if no users found
				}
			});
		});
	} catch (error) {
		console.error(error);
		throw new Error("Error in database routine 'getUser'");
	}
};

// find and return the user in the users table with the given username
async function getFavoritesList(username) {
	try {
		return await new Promise(function (resolve, reject) {
			pool.query("SELECT favorites FROM users WHERE username = $1", [username], (error, results) => {
				if (error) {
					reject(error);
				}
				if (results && results.rows) {
					resolve(results.rows);
				} else {
					reject(new Error("Error in database routine 'getFavoritesList'"));
				}
			});
		});
	} catch (error) {
		console.error(error);
		throw new Error("Error in database routine 'getFavoritesList'");
	}
};

// add a new tree to the given user's list
async function addTree(tree_id, username) {
	try {
		return await new Promise(function (resolve, reject) {
			pool.query("UPDATE users SET favorites = array_append(favorites, $1) WHERE username = $2 RETURNING *",
				[tree_id, username],
				(error, results) => {
					if (error) {
						reject(error);
					}
					if (results && results.rows) {
						resolve(results.rows);
					} else {
						reject(new Error("Error in database routine 'addTree'"));
					}
			});
		});
	} catch (error) {
		console.error(error);
		throw new Error("Error in database routine 'addTree'");
	}
};

// remove a tree from the given user's list
async function removeTree(tree_id, username) {
	try {
		return await new Promise(function (resolve, reject) {
			pool.query("UPDATE users SET favorites = array_remove(favorites, $1) WHERE username = $2 RETURNING *",
				[tree_id, username],
				(error, results) => {
					if (error) {
						reject(error);
					}
					if (results && results.rows) {
						resolve(results.rows);
					} else {
						reject(new Error("Error in database routine 'removeTree'"));
					}
			});
		});
	} catch (error) {
		console.error(error);
		throw new Error("Error in database routine 'removeTree'");
	}
};

module.exports = {
	getTrees,
	getTreeInfo,
	registerUser,
	getUser,
	getFavoritesList,
	addTree,
	removeTree
};