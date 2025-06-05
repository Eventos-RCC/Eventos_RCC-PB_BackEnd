'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('permissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      action: {
        type: Sequelize.STRING(50), // Ex: create, read, update, delete, manage
        allowNull: false,
      },
      resource: {
        type: Sequelize.STRING(50), // Ex: user, event, ministry, role
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING(255), 
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    }, { schema: 'rcc' });

    await queryInterface.addIndex(
      { tableName: 'permissions', schema: 'rcc' },
      ['action', 'resource'], {
        unique: true,
        name: 'idx_action_resource',
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex(
      { tableName: 'permissions', schema: 'rcc' }, 'idx_action_resource');
    await queryInterface.dropTable('permissions', { schema: 'rcc' });
  }
};
