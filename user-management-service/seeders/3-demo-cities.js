'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('cities', [
      {
        country_id: 1,
        name: 'New York',
      },
      {
        country_id: 1,
        name: 'San Francisco',
      },
      {
        country_id: 2,
        name: 'Cordoba',
      },
      {
        country_id: 2,
        name: 'Rosario',
      },
      {
        country_id: 3,
        name: 'London',
      },
      {
        country_id: 3,
        name: 'Liverpool',
      },
      {
        country_id: 3,
        name: 'Birmingham',
      },
      {
        country_id: 4,
        name: 'Sydney',
      },
      {
        country_id: 4,
        name: 'Melbourne',
      },
      {
        country_id: 4,
        name: 'Perth',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('cities', null, {});
  }
};
