'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cities', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        noUpdate: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country_id: {
        type: Sequelize.INTEGER,
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
        queryInterface.addConstraint('cities', {
          type: 'foreign key',
          fields: ['country_id'],
          name: 'fk_cities_countries_country_id',
          references: {
            table: 'countries',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'no action',
        })
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cities');
  }
};