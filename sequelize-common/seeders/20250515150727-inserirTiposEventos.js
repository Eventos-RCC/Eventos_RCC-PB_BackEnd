'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const eventTypes = [
      {
        name: 'Congresso Estadual',
        description: 'Congresso Estadual da RCC - Final de semana'
      },
      {
        name: 'Congresso Diocesano',
        description: 'Congresso Diocesano da RCC - Final de semana'
      },
      {
        name: 'Retiro',
        description: 'Retiro da RCC - Final de semana'
      },
      {
        name: 'Jesus no Litoral',
        description: 'Jesus no Litoral - Uma semana de JNL'
      },
      {
        name: 'Jesus no Sertão',
        description: 'Jesus no Litoral - Uma semana de JNS'
      },
      {
        name: 'Seminário de Vida no Espírito Santo',
        description: 'Seminário de Vida no Espírito Santo - Uma semana de SVES'
      }
    ]
    await queryInterface.bulkInsert({ tableName: 'event_types', schema: 'rcc' }, eventTypes);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({tableName: 'event_types', schema: 'rcc' }, null, {});
  }
};
