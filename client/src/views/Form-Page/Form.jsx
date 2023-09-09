import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import './Form.css'
import validation from '../../components/Validation/validation';
import { pokemonsPost } from '../../redux/actions';
import {pokemonsByTypes} from '../../redux/actions';

const Form = () => {
  const dispatch = useDispatch();
  
  const [errors, setErrors] = useState({});
  
  const types = useSelector(state => state.selectedTypes);
  useEffect(() => {
    dispatch(pokemonsByTypes())
    }, [dispatch, types])
  
    const [formPokemon, setFormPokemon] = useState({
      name: '',
      image: '',
      hp: '',
      attack: '',
      defense: '',
      height: '',
      types: [],
    });
  
    const handleChange = (event) => {
        setFormPokemon({
          ...formPokemon,
          [event.target.name]: event.target.value,
      })
  
      const validationErrors = validation({
        ...formPokemon,
        [event.target.name]: event.target.value,
      });
  
      setErrors({
        ...errors,
        [event.target.name]: validationErrors[event.target.name],
      });
    };
  
    const selectTypes = (event) => {
        const selectedType = event.target.value;
        if (selectedType !== '') {
          setFormPokemon((prevState) => ({
            ...prevState,
            types: [...prevState.types, selectedType],
          }));
        }
      };

      const removeTypes = (selectedType) => {
        setFormPokemon((prevState) => ({
          ...prevState,
          types: prevState.types.filter((type) => type !== selectedType)
        }));
      };
    const handleSubmit = (event) => {
      event.preventDefault();
      const formErrors = validation(formPokemon);
  
      if (Object.keys(formErrors).length === 0) {
        console.log(formPokemon)
        dispatch(pokemonsPost(formPokemon))
      } else {
        setErrors(formErrors);
        alert('ERROR: Por favor complete correctamente los campos');
      }
    };
  
    return (
      <div>
        <form className="Form-Pokemon" onSubmit={handleSubmit}>
          <label htmlFor="Name">Name: </label>
          <input type="text" name="name" value={formPokemon.name} onChange={handleChange} placeholder='Please enter the Name...'  />
          <p className='Errors-p'>{errors.name}</p>
  
          <label htmlFor="image">Image: </label>
          <input type="text" name="image" value={formPokemon.image} onChange={handleChange} placeholder='Please enter the Image...'  />
          <p className='Errors-p'>{errors.image}</p>
  
          <label htmlFor="hp">Hp: </label>
          <input type="text" name="hp" value={formPokemon.hp} onChange={handleChange} placeholder='Please enter the Hp...'  />
          <p className='Errors-p'>{errors.hp}</p>
  
          <label htmlFor="attack">Attack: </label>
          <input type="text" name="attack" value={formPokemon.attack} onChange={handleChange} placeholder='Please enter the Attack...'  />
          <p className='Errors-p'>{errors.attack}</p>
  
          <label htmlFor="defense">Defense: </label>
          <input type="text" name="defense" value={formPokemon.defense} onChange={handleChange} placeholder='Please enter Defense...' />
          <p className='Errors-p'>{errors.defense}</p>

          <label htmlFor="height">Height: </label>
          <input type="text" name="height" value={formPokemon.height} onChange={handleChange} placeholder='Please enter the Height...' />
          <p className='Errors-p'>{errors.height}</p>
  
          <label htmlFor="types">Types: </label>
          <select onChange={selectTypes} name="types">
            {types.map((type) => (
              <option value={type.name} key={type.id} name={type.name}>
                {type.name}
              </option>
            ))}
          </select>
          {formPokemon.types.map((selectedTypes) => (
          <div key={selectedTypes}>
          <span>{selectedTypes}</span>
          <button onClick={() =>removeTypes(selectedTypes)}>Delete 🗑️</button>
          </div>
          ))}
          <p className='Errors-p'>{errors.types}</p>
          <button type="submit" className='Button-Create'>Create</button>
        </form>
      </div>
    );
};
  

 
export default Form;