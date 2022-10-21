const knex = require('knex')
const config = require('../knexfile.js')

let db

function setup() {
  return db || ((db = knex(config)), db)
}

module.exports = setup()
