'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'dioceses', schema: 'rcc' }, [
      {
        diocese_id: 10,
        name: 'Arquidiocese da Paraíba'
      },
      {
        diocese_id: 20,
        name: 'Diocese de Guarabira'
      },
      {
        diocese_id: 30,
        name: 'Diocese de Campina Grande'
      },
      {
        diocese_id: 40,
        name: 'Diocese de Patos'
      },
      {
        diocese_id: 50,
        name: 'Diocese de Cajazeiras'
      },
      {
        diocese_id: 60,
        name: 'Outra'
      }
    ]);

  await queryInterface.bulkInsert({ tableName: 'event_types', schema: 'rcc' }, [
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
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'dioceses', schema: 'rcc' }, null, {});
    await queryInterface.bulkDelete({ tableName: 'event_types', schema: 'rcc' }, null, {});
  }
};
