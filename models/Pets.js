'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pets = sequelize.define('Pets', {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.STRING,
    about: DataTypes.STRING,
    photo: DataTypes.STRING,
    species_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  Pets.associate = function (models) {
    Pets.belongsTo(models.Species, {
      foreignkey: 'species_id',
      as: 'speciesId'
    })
  };
  return Pets;
};