import './Logo-Pokemon.css'
import { NavLink } from 'react-router-dom/';
import imagen from '../../images/pokemon_logo.png'

const LogoPokemons = () => {
    return (
        <div className='logo-pokemon-container'>
            <NavLink to={'/home'}>
            <img className='logo-pokemon' src={imagen} alt='logo-de-pokemons'/>
            </NavLink>
        </div>
    );
}
 
export default LogoPokemons;