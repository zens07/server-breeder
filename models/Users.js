'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  });
  users.associate = function (models) {
    // associations can be defined here
    // users.hasOne(models.profile, {
    //   foreignkey: 'user_id',
    // })
    // users.hasOne(models.payment, {
    //   foreignkey: 'user_id',
    // }),
    users.hasMany(models.pet, {
      foreignkey: 'userId',
    })
  };
  return users;
};