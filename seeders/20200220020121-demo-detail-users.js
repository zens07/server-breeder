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
    return queryInterface.bulkInsert('detail-users', [{
      name: 'Muhammad Nur Zaeni',
      address: 'kadipaten',
      phone: '081772891204',
      user_id: '1'
    }, {
      name: 'Risa Risnawati',
      address: 'jatiwangi',
      phone: '08289828928',
      user_id: '2'
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('detail-users', null, {});
  }
};
