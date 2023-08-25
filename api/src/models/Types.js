const {DataTypes} = require('sequelize')

module.exports = (sequalize) => {
  sequalize.define('Types', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  }, {timestamps: false});

};