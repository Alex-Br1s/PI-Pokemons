const {createPostPokemons} = require('../controllers/pokePostController') 

const pokemonsPost = async (req, res) => {
    const { name, image, hp, attack, defense, height, types } = req.body;

    try {
      const result = await createPostPokemons(name, image, hp, attack, defense, height, types);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
}

module.exports = {pokemonsPost}