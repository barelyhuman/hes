require('dotenv').config()
const process = require('process')

module.exports = {
	client: 'pg',
	connection: process.env.DATABASE_URL,
}
