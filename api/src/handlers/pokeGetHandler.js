
const {getAllPokemons, getPokemonById, getPokemonsByName, getPokemonsByTypes} = require ('../controllers/pokeGetController')

const allPokemons = async (req, res) => {
  try {
      const allPokemons = await getAllPokemons();
        return res.status(200).json(allPokemons)
  } catch (error) {
      res.status(500).json({error: error.message})
  }
  
}

const pokemonsById = async (req, res) => {
    const {id} = req.params// alfanum & numero
    const source = isNaN(id) ? 'bdd' : 'api'
    try {
        const responseById = await getPokemonById(id, source)
        res.status(200).json(responseById)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

const pokemonsByName = async (req, res) => {
    const {name} = req.query
    try {
    const responseByName = await getPokemonsByName(name)
    res.status(200).json(responseByName)
   } catch (error) {
    res.status(500).json({error: error.message})
   } 
}

const pokemonsByTypes = async (req, res) => {
    try {
        const responseByTypes = await getPokemonsByTypes();
        res.status(200).json(responseByTypes)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {allPokemons, pokemonsById, pokemonsByName, pokemonsByTypes}
