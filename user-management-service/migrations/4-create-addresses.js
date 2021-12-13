'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('addresses', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        noUpdate: true,
        autoIncrement: true,
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    }).then(() => {
        queryInterface.addConstraint('addresses', {
          type: 'foreign key',
          fields: ['city_id'],
          name: 'fk_address_cities_city_id',
          references: {
            table: 'cities',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'no action',
        })
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('addresses');
  }
};