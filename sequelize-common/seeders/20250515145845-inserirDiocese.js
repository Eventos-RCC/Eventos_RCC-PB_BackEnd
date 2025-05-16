'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const dioceseData = [
      {
        name: 'Arquidiocese da Paraíba',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Diocese de Guarabira',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Diocese de Campina Grande',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Diocese de Patos',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Diocese de Cajazeiras',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Outra',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]
    await queryInterface.bulkInsert({tableName: 'dioceses', schema: 'rcc'}, dioceseData);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'dioceses', schema: 'rcc' }, null, {});
  }
};
