import './FilterTypes.css'

import { pokemonsByTypes } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

const FilterTypes = ({onFilter}) => {

  const dispatch = useDispatch();
  const pokemons = useSelector(state => state.pokemons);
  const types = useSelector(state => state.selectedTypes);

  const [typeSelected, setTypeSelected] = useState("");

  useEffect(() => {
    dispatch(pokemonsByTypes());
  }, [dispatch]);

  const handleSelectChange = (event) => {
    const selectedType = event.target.value;
    setTypeSelected({
      typeSelected,
      selectedType
    });

    if (selectedType.length) {
      const filteredPokemons = pokemons.filter(pokemon => pokemon.types.includes(selectedType));
      onFilter(filteredPokemons);
    } else {
      onFilter(null);
    }
  };

  return (
    <div className="Filter-Types">
      <h2>Tipos de Pokemon</h2>
      <div className="Filter-Types-Input">
        <select onChange={handleSelectChange}>
          <option value="">All</option>
          {types.map(type => (
            <option value={type.name} key={type.id} className='Option-Types'>
              {type.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

}
export default FilterTypes