const Router = require('express')
const pokemonPost = Router()

const {pokemonsPost} = require('../handlers/pokePostHandler')

pokemonPost.post('/', pokemonsPost)

module.exports = {pokemonPost}