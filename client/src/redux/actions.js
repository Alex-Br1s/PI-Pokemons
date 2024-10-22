import axios from "axios";
import { infoAllPokemon } from "../utils/pokemons.js";

export const ALL_POKEMONS = "ALL_POKEMONS";
export const NAME_POKEMONS = "NAME_POKEMONS";
export const TYPE_POKEMONS = "TYPE_POKEMONS";
export const POST_POKEMONS = "POST_POKEMONS";

export const pokemonsPost = (pokemon) => {
  return async function (dispatch) {
    try {
      let storedPokemons =
        JSON.parse(localStorage.getItem("createdPokemons")) || [];

      const newPokemon = {
        ...pokemon,
        attack: Number(pokemon.attack),
        defense: Number(pokemon.defense),
        height: Number(pokemon.height),
        hp: Number(pokemon.hp),
        id: String(Date.now()),
      };

      storedPokemons.push(newPokemon);
      localStorage.setItem("createdPokemons", JSON.stringify(storedPokemons));
      dispatch({ type: POST_POKEMONS, payload: storedPokemons });
      alert("Pokémon creado exitosamente 😊");
    } catch (error) {
      console.error("Error al crear el Pokemon:", error.message);
      throw new Error("Error al crear el Pokemon");
    }
  };
};

// Función para obtener los Pokémon guardados en LocalStorage
const getPokemonsFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("createdPokemons")) || [];
};

export const allPokemons = () => {
  return async function (dispatch) {
    try {
      const resAllPokemons = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=96"
      );
      const allPokemons = resAllPokemons.data.results;

      // Realizamos las solicitudes a cada Pokémon de manera paralela
      const pokemonsInfo = await Promise.all(
        allPokemons.map(async (pokemon) => {
          const resUrl = await axios.get(pokemon.url);
          return resUrl.data;
        })
      );

      const pokemonsParsed = infoAllPokemon(pokemonsInfo);

      const storedPokemons = getPokemonsFromLocalStorage();

      const combinedPokemons = [...pokemonsParsed, ...storedPokemons];

      dispatch({ type: ALL_POKEMONS, payload: combinedPokemons });
    } catch (error) {
      console.error("Error al obtener todos los pokemones:", error);
      // Aquí podrías manejar el error de una mejor manera, como mostrar un mensaje al usuario o enviar una acción de error a Redux
      dispatch({
        type: "ERROR_POKEMONS",
        payload: "Error al obtener los Pokémon",
      });
    }
  };
};

export const pokemonByName = (name) => {
  return async function (dispatch) {
    try {
      const storedPokemons = getPokemonsFromLocalStorage();

      const pokemonInStorage = storedPokemons.find(
        (p) => p.name.toLowerCase() === name.toLowerCase()
      );

      if (pokemonInStorage) {
        dispatch({ type: NAME_POKEMONS, payload: [pokemonInStorage] });
        return;
      }

      const resNamePokemon = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );

      const pokemonResult = [resNamePokemon.data];

      const pokemonParsed = await infoAllPokemon(pokemonResult);

      if (pokemonResult.length > 0) {
        dispatch({ type: NAME_POKEMONS, payload: pokemonParsed });
      }
    } catch (error) {
      return alert("No se encontro el pokemon " + name);
    }
  };
};

export const pokemonsByTypes = () => {
  return async function (dispatch) {
    const resTypePokemon = await axios.get("https://pokeapi.co/api/v2/type");
    const typePokemon = resTypePokemon.data.results;
    dispatch({ type: TYPE_POKEMONS, payload: typePokemon });
  };
};
