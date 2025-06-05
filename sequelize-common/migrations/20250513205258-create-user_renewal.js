'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('user_renewals', {
      renewalId: {
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
      diocese_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'dioceses',
          key: 'diocese_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      prayer_group: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'prayer_groups',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      has_seminar: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      has_prayer_experience: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      has_don_introduction: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      completed_basic_module: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      completed_human_formation_1: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      completed_human_formation_2: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
    }, {schema: 'rcc'})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('user_renewals', {schema: 'rcc'})
  }
};      

