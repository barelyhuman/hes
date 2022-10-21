const knex = require('knex')
const config = require('../knexfile.js')

let db

function setup() {
  if (db) {
    return db
  }

  db = knex(config)
}

setup()

module.exports = db
