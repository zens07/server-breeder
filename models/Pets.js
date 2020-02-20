'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pets = sequelize.define('Pets', {
    name: DataTypes.STRING,
    detail_user_id: DataTypes.INTEGER
  }, {});
  Pets.associate = function (models) {
    // associations can be defined here
  };
  return Pets;
};