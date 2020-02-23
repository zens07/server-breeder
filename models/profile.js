"use strict";
module.exports = (sequelize, DataTypes) => {
  const profile = sequelize.define(
    "profile",
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {}
  );
  profile.associate = function (models) {
    profile.belongsTo(models.users, {
      foreignkey: "userId"
    });
  };
  return profile;
};
