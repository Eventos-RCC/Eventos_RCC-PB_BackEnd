'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn({tableName: 'user_ministeries', schema: 'rcc', }, 'userId', 'user_id' )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn({tableName: 'user_ministeries', schema: 'rcc', }, 'user_id', 'userId')
  }
};
