'use strict';

/** @type {import('sequelize-cli').Migration} */
export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'adress_id',
      { 
        type: Sequelize.UUID,
        references: {
          model: {
            tableName: 'adresses',
            schema: 'rcc',
          },
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL', 
        allowNull: true
      },
    {schema: 'rcc'}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'adress_id', {
      schema: 'rcc'
    });
  }
};
