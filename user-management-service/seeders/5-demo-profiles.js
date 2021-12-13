'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('profiles', [
      {
        user_id: 1,
        address_id: 2,
        name: 'Terry Pratchett'
      },
      {
        user_id: 2,
        address_id: 3,
        name: 'Neil Gaiman'
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('profiles', null, {});
  }
};
