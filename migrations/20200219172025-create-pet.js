'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      detail_user_id: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'detail_users',
          key: 'id'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
      },
      species: {
        type: Sequelize.INTEGER,
        reference: {
          models: 'species',
          key: 'id'
        },
        onUpdate: 'RESTRICT',
        onDelete: 'RESTRICT'
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
    return queryInterface.dropTable('pets');
  }
};