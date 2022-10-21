require('dotenv').config()

const process = require('process')
const bodyParser = require('body-parser')
const {Router} = require('express')
const exp = require('express')
const {nestie} = require('nestie')
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
	const data = users.map((x) => nestie(x, '.'))
	return response.send({
		data,
	})
})

router.get('/ping', (_, response) => {
	return response.send({pong: true})
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
			return response.send({done: true})
		}
	}
})

app.use('/api', router)

app.listen(port, () => {
	console.log(`>> Listening on ${port}`)
})
