'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('events', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      zip_code: {
        type: Sequelize.STRING,
        allowNull: true
      },
      location_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      event_type_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'event_types',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      status: {
        type: Sequelize.ENUM('active', 'inactive', 'archived', 'deleted'),
        defaultValue: 'inactive',
        allowNull: false
      },
      registration_deadline: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      max_participants: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      diocese_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'dioceses',
          key: 'diocese_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      created_by_user_id: {
        type: Sequelize.UUID,
        references: {
          model: 'users',
          key: 'user_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false
      }
    },
      {
        schema: 'rcc',
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('events', {schema: 'rcc'});
  }
};
