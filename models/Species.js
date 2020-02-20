'use strict';
module.exports = (sequelize, DataTypes) => {
  const Species = sequelize.define('Species', {
    name: DataTypes.STRING,
    information: DataTypes.STRING,
    pet_id: DataTypes.INTEGER
  }, {});
  Species.associate = function (models) {
    // associations can be defined here
  };
  return Species;
};