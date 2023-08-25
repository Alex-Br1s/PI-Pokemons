const { DataTypes } = require('sequelize');
//const { AbstractQuery } = require('sequelize/types/dialects/abstract/query');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Pokemons', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [2, 10],
          msg: "El nombre debe tener entre 2 a 10 caracteres",
        },
      },
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: 'El valor minimo de vida de tu pokemon es 1'
        },
        max: {
          args: 300,
          msg: 'El valor maximo de vida de tu pokemon es 300'
        },
      }
    },

    attack: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        min: {
          args: 1,
          msg: 'El valor minimo de ataque de tu pokemon es 1'
        },
        max: {
          args: 500,
          msg: 'El valor maximo de ataque de tu pokemon es 500'
        },
      }
    },

    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: 'El valor minimo de defensa de tu pokemon es 1'
        },
        max: {
          args: 400,
          msg: 'El valor maximo de defensa de tu pokemon es 400'
        },
      }
    },

    height: {
      type: DataTypes.INTEGER,
      allowNull:false,
      validate: {
        min: {
          args: 1,
          msg: 'El valor minimo de altura de tu pokemon es 1'
        },
        max: {
          args: 200,
          msg: 'El valor maximo de altura de tu pokemon es 200'
        },
      }
    },
    created: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    }
  }, {timestamps: false});

};
