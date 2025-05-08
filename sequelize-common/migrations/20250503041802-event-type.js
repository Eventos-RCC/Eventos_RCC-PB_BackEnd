'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('event_types', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.ENUM('Retiro', 'Congresso Estadual', 'Congresso Diocesano', 'Jesus no Litoral', 'Jesus no Sertão', 'Seminário de Vida no Espírito Santo'),
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true
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
   await queryInterface.dropTable('event_types', {schema: 'rcc'});
  }
};
