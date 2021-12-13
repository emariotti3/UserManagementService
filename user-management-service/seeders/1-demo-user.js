'use strict';
var crypto = require('crypto');

var passwordHasher = function hashPassword(password) {
    const hash = crypto.createHash('sha256')
    hash.update(password)
    return hash.digest('hex')
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [
      {
        username: 'terry_pratchett_123',
        password: passwordHasher('discworld123')
      },
      {
        username: 'neilGaiman666',
        password: passwordHasher('coraline1960'),
      }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
