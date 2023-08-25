import { ALL_POKEMONS, NAME_POKEMONS, TYPE_POKEMONS, POST_POKEMONS} from "./actions"

const initialState = {
    pokemons: [],
    selectedTypes: []
}

const rootReducer = (state = initialState, action) =>{
    switch (action.type){
        case ALL_POKEMONS: {
            return{
                ...state,
                pokemons: action.payload
            }
        }
        case NAME_POKEMONS: {
            return{
                ...state,
                pokemons: action.payload
            }
        }
        case TYPE_POKEMONS: {
            return{
                ...state,
                selectedTypes: action.payload
            }
        }
        case POST_POKEMONS: {
            return{
                ...state,
                pokemons: [...state.pokemons, action.payload]
            }
        }

        default: {
            return {...state}
        }
    }
}

export default rootReducer