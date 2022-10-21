require('dotenv').config()

const process = require('process')
const bodyParser = require('body-parser')
const { Router } = require('express')
const exp = require('express')
const { nestie } = require('nestie')
const db = require('./db/db.js')

const app = exp()
app.use(bodyParser.json())

const port = process.env.PORT || 3000

const router = new Router()

router.get('/all', async (_, response) => {
  const users = await db('users')
    .leftJoin('pokemons', 'pokemons.owner_id', 'users.id')
    .select([
      'users.name as name',
      'users.created_at as created_at',
      'pokemons.name as pokemons.name',
      'pokemons.pokemon_id as pokemons.pokemon_id',
      'pokemons.created_at as pokemons.created_at',
    ])
  const data = users.map(x => nestie(x, '.'))
  return response.send({
    data,
  })
})

router.get('/authenticate', async (req, res) => {
  const authToken = req.headers['authorization'] || req.headers['Authorization']

  if (authToken) {
    // Add in your authentication parameters
    return res.status(200).json({
      'x-Hasura-Role': 'user',
    })
  }

  return res.status(401).end()
})

// user authenticates themselves using https://api.example.com/v1/login
// then uses the returned token on https://api.example.com/graphql or https://api.example.com/console (hasura)
// which get's it back to https://api.example.com/v1/authenticate , validates the role and id of user
// which can then be used by hasura permissions
//
// TODO: change this to a POST request first.
router.get('/login', (req, res) => {
  return res.json({
    token: '123',
  })
})

router.get('/ping', (_, response) => {
  return response.send({ pong: true })
})

router.get('/events', async (request, response) => {
  switch (request.body.trigger.name) {
    case 'hashUsername': {
      const newData = request.body.event.data.new
      newData.hashed_name = Buffer.from(newData.name).toString('base64')
      await db('users')
        .where({
          id: newData.id,
        })
        .update(newData)
      return response.send({ done: true })
    }
  }
})

app.use('/v1', router)

app.listen(port, () => {
  console.log(`>> Listening on ${port}`)
})
