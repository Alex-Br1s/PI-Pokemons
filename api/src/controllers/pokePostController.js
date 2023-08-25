 const {Pokemons, Types} = require('../db')

const createPostPokemons = async (name, image, hp, attack, defense, height, types) => {
 
  const newPokemon = await Pokemons.create({ name, image, hp, attack, defense, height });

  if (newPokemon && types && Array.isArray(types)) {
    const typeToAssociate = await Promise.all(
      types.map((typeName) => Types.findOrCreate({ where: { name: typeName } }))
    );
    await newPokemon.setTypes(typeToAssociate.map((type) => type[0]));
  }

  const resultPokemon = await Pokemons.findAll({
    where: { name },
    include: [
      {
        model: Types,
        attributes: ['id', 'name'],
        through: { attributes: [] } // Excluir la tabla intermedia type_pokemon
      }
    ],
    attributes: { exclude: ['createdAt', 'updatedAt'] } // Excluir createdAt y updatedAt del modelo Pokemons
  });

  return resultPokemon[0];

};

module.exports = {createPostPokemons} 