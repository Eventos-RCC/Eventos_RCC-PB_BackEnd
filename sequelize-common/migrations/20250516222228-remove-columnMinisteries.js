'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn({ tableName: 'user_ministeries', schema: 'rcc', }, 'id');
    await queryInterface.changeColumn(
      { tableName: 'user_ministeries', schema: 'rcc', },
      'userId', {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );

    await queryInterface.changeColumn(
      { tableName: 'user_ministeries', schema: 'rcc', },
      'ministeries_id', {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'ministeries',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    );

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('user_ministeries', 'id',
      {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
        unique: true
      },
      { schema: 'rcc' }
    );
    await queryInterface.changeColumn('user_ministeries', 'userId',
      {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'user_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',

      },
      { schema: 'rcc' }
    );
    await queryInterface.changeColumn('user_ministeries', 'ministeries_id',
      {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'ministeries',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      { schema: 'rcc' }
    );
  }
};
