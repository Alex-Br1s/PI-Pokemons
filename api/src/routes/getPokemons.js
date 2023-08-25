const {Router} = require('express')
const pokemonGet = Router()
const {allPokemons, pokemonsById, pokemonsByName, pokemonsByTypes} = require('../handlers/pokeGetHandler')



pokemonGet.get('/', allPokemons)

pokemonGet.get('/name', pokemonsByName)

pokemonGet.get('/types', pokemonsByTypes)

pokemonGet.get('/:id', pokemonsById)

module.exports = {pokemonGet}