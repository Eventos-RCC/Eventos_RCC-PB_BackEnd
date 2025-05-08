'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports =  {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('events', 'zip_code', { schema: 'rcc' })
    await queryInterface.removeColumn('events', 'location_name', { schema: 'rcc' })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('events', {
      zip_code: {
        type: Sequelize.STRING,
        allowNull: true
      },
      location_name: {
        type: Sequelize.STRING,
        allowNull: true
      }
    }, {
      schema: 'rcc'
    });
  }
};
