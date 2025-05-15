'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('permissions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
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

    await queryInterface.addIndex('permissions', ['action', 'resource'], {
      unique: true,
      name: 'idx_action_resource',
      schema: 'rcc'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('permissions', 'idx_action_resource', { schema: 'rcc' });
    await queryInterface.dropTable('permissions', { schema: 'rcc' });
  }
};
