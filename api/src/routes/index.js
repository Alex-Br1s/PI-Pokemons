const { Router } = require('express');
const {pokemonGet} = require('../routes/getPokemons')
const {pokemonPost} = require('../routes/postPokemons')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/pokemons', pokemonGet)

router.use('/pokemons', pokemonPost)

module.exports = router;
