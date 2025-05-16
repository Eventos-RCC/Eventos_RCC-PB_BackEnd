'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'level_user', { schema: 'rcc' });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', {
      level_user: {
        type: Sequelize.ENUM('admin', 'user'),
        allowNull: false,
        defaultValue: 'user'
      }
    }, {
      schema: 'rcc'
    });
  }
};
