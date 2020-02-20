'use strict';
module.exports = (sequelize, DataTypes) => {
  const detailUsers = sequelize.define('DetailUsers', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {});
  detailUsers.associate = function (models) {
    detailUsers.belongsTo(models.Users, {
      foreignkey: 'user_id',
      as: 'userId'
    })
  };
  return detailUsers;
};