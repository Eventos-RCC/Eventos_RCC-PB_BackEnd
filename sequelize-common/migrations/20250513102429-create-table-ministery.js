'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ministeries', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      abbreviation: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        unique: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
    }, { schema: 'rcc' })
    
    await queryInterface.bulkInsert({ table: 'ministeries', schema: 'rcc' }, [
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
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ministeries', { schema: 'rcc' });
    await queryInterface.bulkDelete({ tableName: 'ministeries', schema: 'rcc' }, null, {})
  }
};
