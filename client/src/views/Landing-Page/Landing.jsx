import './Landing.css'
import { NavLink } from "react-router-dom";
import image from '../../images/pokemon_collage.jpg'

const Landing = () => {
    return (
    <div className="Landing">
     <div className="image-container">
      <img src={image} alt="Descripción de la imagen" />
       <div className="overlay">
      <h2 className='Made-Alex'>Made by Alexander</h2> 
        <p className='arrow'>⬇️</p>
        <NavLink to="/home">
          <button className='button-home'>Home</button>
        </NavLink>
      </div>
    </div>
  </div>
);
}
 
export default Landing