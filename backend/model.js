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

//get all tree info in our database
async function getTrees() {
	try {
		return await new Promise(function (resolve, reject) {
			pool.query("SELECT taxon, common_name, map_link FROM trees", (error, results) => {
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
	} catch (error_1) {
		console.error(error_1);
		throw new Error("Internal server error");
	}
};

module.exports = {
	getTrees
};