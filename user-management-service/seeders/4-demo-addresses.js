'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('addresses', [
      {
        city_id: 1,
        street: 'Broadway',
      },
      {
        city_id: 2,
        street: '14th St.',
      },
      {
        city_id: 2,
        street: 'Woodside Ave.',
      },
      {
        city_id: 3,
        street: '25 de Mayo',
      },
      {
        city_id: 4,
        street: 'Av. Pellegrini',
      },
      {
        city_id: 5,
        street: 'Baker St.',
      },
      {
        city_id: 6,
        street: 'Vernon St.',
      },
      {
        city_id: 7,
        street: 'Station Rd.',
      },
      {
        city_id: 8,
        street: 'Bridge St.',
      },
      {
        city_id: 9,
        street: 'Gower St.',
      },
      {
        city_id: 10,
        street: 'Charsley St.',
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('addresses', null, {});
  }
};
