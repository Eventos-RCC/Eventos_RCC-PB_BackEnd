'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dioceseData = [
      {
        name: 'Arquidiocese da Paraíba',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Diocese de Guarabira',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Diocese de Campina Grande',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Diocese de Patos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Diocese de Cajazeiras',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Outra',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]
    await queryInterface.bulkInsert('dioceses', dioceseData, { schema: 'rcc' });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('dioceses', null, { schema: 'rcc' });
  }
};
