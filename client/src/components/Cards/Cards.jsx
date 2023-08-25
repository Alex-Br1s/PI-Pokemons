import Card from "../Card/Card";
import './Cards.css'

const Cards = ({ currentPokemons,/*  handlePokemonClick, selectedPokemon  */}) => {
    const filteredPokemons = /* selectedPokemon ? [selectedPokemon] :  */currentPokemons;
  
    return (
      <div className="Cards">
        {filteredPokemons.map(poke => (
          <Card
            key={poke.id}
            id={poke.id}
            name={poke.name}
            types={poke.types}
            image={poke.image}
            /* onClick={() => handlePokemonClick(poke)} */
          />
        ))}
      </div>
    );
  }
 
export default Cards;