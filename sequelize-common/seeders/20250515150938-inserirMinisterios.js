'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const ministeries = [
      {
        name: 'Ministério de Comunicação Social',
        abbreviation: 'MCS',
      },
      {
        name: 'Ministério de Formação',
        abbreviation: 'MF',
      },
      {
        name: 'Ministério de Intercessão',
        abbreviation: 'MI',
      },
      {
        name: 'Ministério de Música e Artes',
        abbreviation: 'MMA',
      },
      {
        name: 'Ministério de Oração por Cura e Libertação',
        abbreviation: 'MOCLE',
      },
      {
        name: 'Ministério de Pregação',
        abbreviation: 'MP',
      },
      {
        name: 'Ministério de Promoção Humana',
        abbreviation: 'MPH',
      },
      {
        name: 'Ministério Fé e Política',
        abbreviation: 'MFP',
      },
      {
        name: 'Ministério Jovem',
        abbreviation: 'MJ',
      },
      {
        name: 'Ministério para as Famílias',
        abbreviation: 'MPF',
      },
      {
        name: 'Ministério para Crianças e Adolescentes',
        abbreviation: 'MCA',
      },
      {
        name: 'Ministério para Ministros Ordenados',
        abbreviation: 'MMO',
      },
      {
        name: 'Ministério para Religiosas e Consagradas Celibatárias',
        abbreviation: 'MRCC',
      },
      {
        name: 'Ministério para Seminaristas',
        abbreviation: 'MS'
      },
      {
        name: 'Ministério Universidades Renovadas',
        abbreviation: 'MUR'
      },
    ]
    await queryInterface.bulkInsert('ministeries', ministeries, { schema: 'rcc' });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('ministeries', null, { schema: 'rcc' });
  }
};
