import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import './Detail.css'

const Detail = () => {

  const {id} = useParams()
  const pokemon = useSelector((state) => state.pokemons)
  // eslint-disable-next-line eqeqeq
  const pokemonId = pokemon.find((poke) => poke.id == id)

  return (
  <div>
     {pokemonId? (
        <div className="pokemonDetail">
          <img src={pokemonId.image} alt={pokemonId.name} className="img-detail"/>
          <h2>Name: {pokemonId.name}</h2>
          <p>Id: {pokemonId.id}</p>
          <p>Types: {pokemonId.types.join(', ')}</p>
          <p>Hp: {pokemonId.hp}</p>
          <p>Attack: {pokemonId.attack}</p>
          <p>Defense: {pokemonId.defense}</p>
          <p>Height: {pokemonId.height}</p>
        </div>
      ) : (
        <p>Pokémon not found</p>
      )}
  </div>
  )
};


 
export default Detail;