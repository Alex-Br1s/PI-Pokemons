export const infoAllPokemon = (pokemons) => {
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

export const filterPokemonByDb = (pokemon) => {
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