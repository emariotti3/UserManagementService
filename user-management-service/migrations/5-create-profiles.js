'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profiles', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        noUpdate: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      name: {
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
        queryInterface.addConstraint('profiles', {
          type: 'foreign key',
          fields: ['user_id'],
          name: 'fk_profiles_users_user_id',
          references: {
            table: 'users',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'no action',
        })
    }).then(() => {
      queryInterface.addConstraint('profiles', {
        type: 'foreign key',
        fields: ['address_id'],
        name: 'fk_profiles_address_address_id',
        references: {
          table: 'addresses',
          field: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'no action',
      })
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('profiles');
  }
};