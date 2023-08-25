//? MAPEA LA INFO NECESARIA DE TODOS LOS POKEMONES

const infoAllPokemon = (pokemons) => {
    return pokemons.map((pokemon) => {
        return{
            id: pokemon.id,
            name: pokemon.name,
            image: pokemon.sprites.other.dream_world.front_default,
            hp: pokemon.stats[0].base_stat,
            attack: pokemon.stats[1].base_stat,
            defense: pokemon.stats[2].base_stat,
            height: pokemon.height,
            types: pokemon.types.map(type => type.type.name),
        }
    })
}

//? FILTRA LA INFO DE POKEMON POR ID
const filterPokemonByApi = (pokemonIdApi) => {
    if(!pokemonIdApi) return null
    else{    
        return {
            id: pokemonIdApi.id,
            name: pokemonIdApi.name,
            image: pokemonIdApi.sprites.other.dream_world.front_default,
            hp: pokemonIdApi.stats[0].base_stat,
            attack: pokemonIdApi.stats[1].base_stat,
            defense: pokemonIdApi.stats[2].base_stat,
            height: pokemonIdApi.height,
            types: pokemonIdApi.types.map(type => type.type.name),
        };
    }
};

//? FILTRA LA INFO DE LA BASE DE DATOS
const filterPokemonByDb = (pokemon) => {
    if (!pokemon) {
      return null;
    }
  
    return {
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.image,
      hp: pokemon.hp,
      attack: pokemon.attack,
      defense: pokemon.defense,
      height: pokemon.height,
      types: pokemon.Types.map((type) => type.name)
    };
  };

//? MAPEA LA INFO NECESARIA DE LA DB 
const filterDbAllPokemons = (pokemon) => {
    return pokemon.map((pokemon) => {
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.image,
          hp: pokemon.hp,
          attack: pokemon.attack,
          defense: pokemon.defense,
          height: pokemon.height,
          types: pokemon.Types.map((type) => type.name),
        };
    })
};

module.exports = { infoAllPokemon, filterPokemonByApi, filterPokemonByDb, filterDbAllPokemons }