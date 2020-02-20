'use strict';
module.exports = (sequelize, DataTypes) => {
  const DetailPet = sequelize.define('DetailPets', {
    gender: DataTypes.STRING,
    age: DataTypes.STRING,
    about_pet: DataTypes.STRING,
    photo: DataTypes.STRING,
    pet_id: DataTypes.INTEGER
  }, {});
  DetailPet.associate = function (models) {
    // associations can be defined here
  };
  return DetailPet;
};