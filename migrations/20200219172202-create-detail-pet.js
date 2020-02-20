'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('detail-pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.ENUM,
        values: [
          'Male',
          'Female'
        ]
      },
      age: {
        type: Sequelize.ENUM,
        values: [
          'adult',
          'young',
          'little'
        ]
      },
      about_pet: {
        type: Sequelize.STRING
      },
      photo: {
        type: Sequelize.STRING
      },
      pet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'pets',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('detail-pets');
  }
};