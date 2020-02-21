'use strict';
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  Users.associate = function (models) {
    // associations can be defined here
    Users.hasMany(models.Pets, {
      foreignkey: 'user_id',
      as: 'userId'
    })
  };
  return Users;
};