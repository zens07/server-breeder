'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profiles', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  Profile.associate = function (models) {
    Profile.belongsTo(models.Users, {
      foreignkey: 'user_id',
      as: 'userId'
    })
  };
  return Profile;
};