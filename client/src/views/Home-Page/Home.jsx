import './Home.css';
import Cards from "../../components/Cards/Cards";
import Pagination from '../../components/Pagination/Pagination';
import Searchbar from '../../components/SearchBar/Searchbar';
import FilterTypes from '../../components/Filter/FilterTypes';
//import PokemonDetail from '../../components/PokemonDeatil/PokemonDetail';

import { allPokemons, pokemonByName } from "../../redux/actions";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect, useState } from "react";


const Home = () => {

  const pokemons = useSelector(state => state.pokemons);
  const dispatch = useDispatch();
//?Estados de pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage,/*  setPokemonsPerPage */] = useState(12);
//?Estado de FilterByTypes
  const [filteredPokemons, setFilteredPokemons] = useState(null);
//?Estado de FilterByAsc-Des
  const [orderAlfabetico, setOrderAlfabetico] = useState('A-Z')
//?Estado para Filtrar por Attack
  const [attackFilter, setAttackFilter] = useState('')
//?Estado para Filtrar si es de la db o api
  const [originFilter, setOriginFilter] = useState('')
//?Estado para mostrar los detalles de los pokemones
//  const [selectedPokemon, setSelectedPokemon] = useState(null);


//? Logica de paginado
  const pokemonsTotal = filteredPokemons ? filteredPokemons.length : pokemons.length;
  const lastIndex = currentPage * pokemonsPerPage;
  const firstIndex = lastIndex - pokemonsPerPage;
  
  const filteredPokemonsByType = filteredPokemons ? filteredPokemons : pokemons;
  
  const sortedPokemons = [...filteredPokemonsByType].sort((a, b) => {
    // Verifica si ambos Pokémon tienen el campo "name"
  if (a.name && b.name) {
    if (orderAlfabetico === 'A-Z') {
      return a.name.localeCompare(b.name);
    } else if (orderAlfabetico === 'Z-A') {
      return b.name.localeCompare(a.name);
    }
  }
  // Si alguno no tiene "name", no ordenamos (mantiene el orden original)
  return 0;
});


const currentPokemons = sortedPokemons.slice(firstIndex, lastIndex);

  useEffect(() => {
    setOrderAlfabetico('')
    dispatch(allPokemons());
  }, [dispatch]);

  const handleSearch = (name) => {
    try {
      dispatch(pokemonByName(name));
      setCurrentPage(1);
      setFilteredPokemons(null);
    } catch (error) {
      alert('Error al buscar el pokemon: ' + error.message);
    }
  };

//*Funcion filtra por tipos
  const handleFilter = (filteredPokemons) => {
    setCurrentPage(1);
    setFilteredPokemons(filteredPokemons);
  };

//*Funcion filtra por asc o des
  const handleSortChange = (event) => {
    setOrderAlfabetico(event.target.value)
  };

//*Funcion que filtra por max Attack y min Attack
  const handleAttackFilterChange = (event) => {
    const value = event.target.value;
    setAttackFilter({
      attackFilter,
      value});
  
    if (value === 'max') {
      const sortedPokemons = [...filteredPokemonsByType].sort((a, b) => b.attack - a.attack);
      setFilteredPokemons(sortedPokemons);
    } else if (value === 'min') {
      const sortedPokemons = [...filteredPokemonsByType].sort((a, b) => a.attack - b.attack);
      setFilteredPokemons(sortedPokemons);
    } else {
      setFilteredPokemons(null);
    }
  };

//*Funcion que filtra por api o db
  const handleOriginFilterChange = (event) => {
    const value = event.target.value;
    setOriginFilter({
      ...originFilter,
      value
    });

    if (value === 'api') {
      const filteredPokemons = pokemons.filter(pokemon => typeof pokemon.id === 'number');
      setFilteredPokemons(filteredPokemons);
    } else if (value === 'db') {
      const filteredPokemons = pokemons.filter(pokemon => typeof pokemon.id === 'string');
      setFilteredPokemons(filteredPokemons);
    } else {
      setFilteredPokemons(null);
    }
  };

//*Funcion para los detalles de los pokemons
/*   const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon)
  }
 */

  return (
    <div className="Home">
      <Searchbar onSearch={handleSearch} />
      <FilterTypes onFilter={handleFilter} />

  <div className='Filters-Home'>
    <div className='Filter-Attack'>
      <h2>Attack</h2>
      <select onChange={handleAttackFilterChange}>
        <option value="">Default</option>
        <option value="max">Max Attack</option>
        <option value="min">Min Atackk</option>
      </select>
    </div>

    <div className='filter-origin'>
        <h2>Origin</h2>
        <select onChange={handleOriginFilterChange}>
          <option value="">All</option>
          <option value="api">Api</option>
          <option value="db">Db</option>
        </select>
      </div>

    <div className='Asc-Des'>
       <h2>Asc or Des</h2>
       <select onChange={handleSortChange} >
       <option>Default</option>
       <option value='A-Z'>A-Z</option>
       <option value='Z-A'>Z-A</option>
      </select>
    </div>

    </div>
      <Cards currentPokemons={currentPokemons} /* handlePokemonClick={handlePokemonClick} */ /* selectedPokemon={selectedPokemon} *//>
      {/*selectedPokemon && <PokemonDetail pokemon={selectedPokemon} />*/}
      <Pagination
        currentPage={currentPage}
        pokemonsPerPage={pokemonsPerPage}
        setCurrentPage={setCurrentPage}
        pokemonsTotal={pokemonsTotal}
      />
  </div>
  );

}
 
export default Home;
