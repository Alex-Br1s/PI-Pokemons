import { NavLink } from 'react-router-dom'

import './Card.css'

const Card = (props) => {

    return (
          <NavLink to={`/detail/${props.id}`} className='NavLink'>
          <div className="Card" onClick={props.onClick}>
          <p className="Pokemon-Name">{props.name}</p>
          <img src={props.image} alt="img" />
          <p className="Pokemon-Types" /* className={props.types} */>{props.types}</p>
          </div>
          </NavLink>
      );
}
 
export default Card;