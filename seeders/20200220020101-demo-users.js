'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('users', [{
      email: 'nurzaenimuhammad@gmail.com',
      password: '12345',
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'risarisnawati@gmail.com',
      password: '12345',
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('users', null, {});
  }
};
