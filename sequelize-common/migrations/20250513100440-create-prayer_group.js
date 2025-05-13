'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prayer_groups', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      year_of_creation: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      diocese_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'dioceses',
          key: 'diocese_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      cordinator_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      adress: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'adresses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      inUnity: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive'),
        defaultValue: 'active',
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
    }, { schema: 'rcc' });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('prayer_groups', {
      schema: 'rcc',
    });
  }
};
