import axios from 'axios'

export const ALL_POKEMONS = 'ALL_POKEMONS'
export const NAME_POKEMONS = 'NAME_POKEMONS'
export const TYPE_POKEMONS = 'TYPE_POKEMONS'
export const POST_POKEMONS = 'POST_POKEMONS'

export const allPokemons = () => {
  return async function (dispatch){
    try {
      const resAllPokemons = await axios.get('http://localhost:3001/pokemons')
      const allPokemons = resAllPokemons.data
      dispatch({type: ALL_POKEMONS, payload: allPokemons})
    } catch (error) {
      throw alert(error, 'Error al obtener todos los pokemones')
    }
  }
}

export const pokemonByName = (name) => {
    return async function(dispatch) {
       try {
           const resNamePokemon = await axios.get(`http://localhost:3001/pokemons/name?name=${name}`)
           const namePokemon = resNamePokemon.data
           const pokemonArray = []
           pokemonArray.push(namePokemon)
           if(pokemonArray.length > 0) {
           dispatch({type: NAME_POKEMONS, payload: pokemonArray})
        }
       } catch (error) {
        return alert('No se encontro el pokemon ' + name)
       }
    }
}

export const pokemonsByTypes = () => {
    return async function(dispatch) {
        const resTypePokemon = await axios.get('http://localhost:3001/pokemons/types')
        const typePokemon = resTypePokemon.data
        dispatch({type: TYPE_POKEMONS, payload: typePokemon})
    }
}

export const pokemonsPost = (pokemon) => {
    return async function(dispatch) {
      try {
        const resPostPokemon = await axios.post('http://localhost:3001/pokemons', pokemon);
        const postPokemon = resPostPokemon.data;
        dispatch({ type: POST_POKEMONS, payload: postPokemon });
        alert('Pokémon creado exitosamente 😊');
        console.log(resPostPokemon);
      } catch (error) {
        if (error.response && error.response.status === 500) {
          // Error de llave repetida
          alert('ERROR: Pokemon con este nombre y/o imagen ya existe 😔');
        } else {
          // Otros errores
          console.error('Error al crear el Pokemon:', error.message);
          alert('ERROR: ' + error.message);
        }
      }
    };
  };