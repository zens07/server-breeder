'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payments', {
    no_rek: DataTypes.STRING,
    proof_of_transfer: DataTypes.STRING,
    status: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {});
  Payment.associate = function (models) {
    Payment.belongsTo(models.Users, {
      foreignkey: 'user_id',
      as: 'userId'
    })
  };
  return Payment;
};