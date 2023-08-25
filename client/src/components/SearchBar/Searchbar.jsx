import './Searchbar.css'
import { useState, useEffect } from 'react'

const Searchbar = ({onSearch}) => {
    const [name, setName] = useState('')
    
    const handleInputChange = (event) => {
        setName(event.target.value)
    }
    useEffect(() => {//Atento a lo que escribo en el input
    }, [name])
    
    const handleSubmit = (event) =>{ 
        event.preventDefault();
        if(!name.length) alert("Please enter a name");
        else {
          onSearch(name)
        }
        setName('')
    }


    return (
        <form onSubmit={handleSubmit}>
        <div className='Searchbar'>
            <input className='Input-search' onChange={handleInputChange} value={name} type="text" />
            <button className='Button-search' type='submit'>🔎</button>
        </div>
        </form>
    );
}

export default Searchbar;