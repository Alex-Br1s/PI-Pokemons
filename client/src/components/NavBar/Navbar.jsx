import { NavLink } from "react-router-dom";
import LogoPokemons from "../Logo-Pokemon/LogoPokemon";
import { useLocation } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
    const location = useLocation()
    return ( 
        <div className="Navbar">
        <LogoPokemons />
        {location.pathname === '*' && <LogoPokemons />}
        {location.pathname !== '/create' && <NavLink to='/create' className='Nav-Link'><p className="Form-p">Form</p></NavLink> }
        </div>
    );
}

export default Navbar;