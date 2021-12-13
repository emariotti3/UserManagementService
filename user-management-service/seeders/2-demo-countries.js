'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('countries', [
      {
        name: 'United States',
      },
      {
        name: 'Argentina',
      },
      {
        name: 'England',
      },
      {
        name: 'Australia',
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('countries', null, {});
  }
};
