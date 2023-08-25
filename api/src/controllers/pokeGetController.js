const {Op} = require('sequelize')
const axios = require('axios')
const {Pokemons, Types} = require('../db')

const { infoAllPokemon, filterPokemonByApi, filterPokemonByDb, filterDbAllPokemons } = require('../utils/index')

const {URL, URL_TYPE} = process.env 

//** Todos los pokemones
 const getAllPokemons = async () => {
    try {
        const responseByApi = await axios.get(`${URL}?limit=96`)
        const responseAll = responseByApi.data.results
        const pokemonsInfo = []
        for (const pokemon of responseAll){
            try {
                const responseUrl = await axios.get(pokemon.url)
                const responseStats = responseUrl.data
                pokemonsInfo.push(responseStats)
            } catch (error) {
                throw Error('Error al queres obtener la info de los pokemones; ' + {message:error})
            }
        }
      const pokemonApiEnd = await infoAllPokemon(pokemonsInfo)
      const pokemonDb = await Pokemons.findAll({
        include:{
          attributes: ["name"],
          model: Types,
          through: {
          attributes: [],
          },
      }
      })
      const pokemonDbEnd = filterDbAllPokemons(pokemonDb)
      return [...pokemonDbEnd, ...pokemonApiEnd]
  } catch (error) {
      throw Error('No se encontro los pokemones')
 }
}      

//** Pokemones por id
const getPokemonById = async (id, source) => {
    let pokemon;

    if(source === 'api'){
        const responseByApi = await axios.get(`${URL}/${id}`)
        pokemon = responseByApi.data;
        return filterPokemonByApi(pokemon)

    }else{
        pokemon = await Pokemons.findOne({
          where: {
            id: id
        },
        include:{
            model: Types,
            attributes: ["name"],
            through: {
              attributes: []
            }
        }
    });
      return filterPokemonByDb(pokemon)
  } 
}

//** Pokemones por nombre
const getPokemonsByName = async (name) => {
    console.log(name)
    try {
      const nameLower = name.toLowerCase();
      
      // Buscar en la base de datos
      const dbResult = await Pokemons.findOne({
        where: {
          name: {
            [Op.iLike]: `%${nameLower}%`
          }
        },
        include: [
          {
            model: Types,
            attributes: ['id', 'name'],
            through: { attributes: [] }
          }
        ]
      });
  
      // Si se encuentra en la base de datos devolver el resultado
      if (dbResult) {
        return filterPokemonByDb(dbResult);
      }
  
      // Si no se encuentra en la base de datos, buscar en la API
      const responseByApi = await axios.get(`${URL}/${nameLower}`);
      const resultsName = responseByApi.data;
      console.log(resultsName);
      // Devolver el resultado de la API
      if (resultsName) {
        return filterPokemonByApi(resultsName);
      }
  
      // Si no se encuentra en la API ni en la base de datos, lanzo un error
      throw new Error(`No se encontró el Pokémon con el nombre: ${nameLower}`);
    } catch (error) {
      throw new Error(`Error al buscar el Pokémon por nombre: ${name}, ${error.message}`);
    }


};


//** Pokemones por tipos
const getPokemonsByTypes = async () => {
    try {
        const responseByApi = await axios.get(`${URL_TYPE}`)
        const responseTypes = responseByApi.data.results
        const responseInDb = responseTypes.map(type => {
            return{
                name: type.name,
            }
        })
        const typeByDb = await Types.bulkCreate(responseInDb)
        return typeByDb
    } catch (error) {
      throw new Error('Error al obtener los tipos de pokemones')
    }
}

module.exports = {getAllPokemons, getPokemonById, getPokemonsByName,  getPokemonsByTypes}








