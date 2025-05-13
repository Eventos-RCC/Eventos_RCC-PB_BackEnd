'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_ministeries', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      ministeries_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'ministeries',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    }, {schema: 'rcc'})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_ministeries', {schema: 'rcc'})
  }
};
