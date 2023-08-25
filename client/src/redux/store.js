import {createStore, applyMiddleware, compose} from 'redux';
//import {composeWithDevTools} from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducer';
//import thunk from 'redux-thunk'

const composeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;// esta linea sirve para conectar nuetra App con la extensión REDUX DEVTOOLS del NAVEGADOR

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware)));//esta linea sirve para que podamos hacer peticiones a una API/SERVIDOR

export default store;




