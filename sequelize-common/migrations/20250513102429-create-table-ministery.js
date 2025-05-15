'use strict';
const { v4: uuidv4 } = require('uuid');

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
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
    }, { schema: 'rcc' })
    
    await queryInterface.bulkInsert({ tableName: 'ministeries', schema: 'rcc' }, [
      {
        id: uuidv4(),
        name: 'Ministério de Comunicação Social',
        abbreviation: 'MCS',
      },
      {
        id: uuidv4(),
        name: 'Ministério de Formação',
        abbreviation: 'MF',
      },
      {
        id: uuidv4(),
        name: 'Ministério de Intercessão',
        abbreviation: 'MI',
      },
      {
        id: uuidv4(),
        name: 'Ministério de Música e Artes',
        abbreviation: 'MMA',
      },
      {
        id: uuidv4(),
        name: 'Ministério de Oração por Cura e Libertação',
        abbreviation: 'MOCLE',
      },
      {
        id: uuidv4(),
        name: 'Ministério de Pregação',
        abbreviation: 'MP',
      },
      {
        id: uuidv4(),
        name: 'Ministério de Promoção Humana',
        abbreviation: 'MPH',
      },
      {
        id: uuidv4(),
        name: 'Ministério Fé e Política',
        abbreviation: 'MFP',
      },
      {
        id: uuidv4(),
        name: 'Ministério Jovem',
        abbreviation: 'MJ',
      },
      {
        id: uuidv4(),
        name: 'Ministério para as Famílias',
        abbreviation: 'MPF',
      },
      {
        id: uuidv4(),
        name: 'Ministério para Crianças e Adolescentes',
        abbreviation: 'MCA',
      },
      {
        id: uuidv4(),
        name: 'Ministério para Ministros Ordenados',
        abbreviation: 'MMO',
      },
      {
        id: uuidv4(),
        name: 'Ministério para Religiosas e Consagradas Celibatárias',
        abbreviation: 'MRCC',
      },
      {
        id: uuidv4(),
        name: 'Ministério para Seminaristas',
        abbreviation: 'MS'
      },
      {
        id: uuidv4(),
        name: 'Ministério Universidades Renovadas',
        abbreviation: 'MUR'
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'ministeries', schema: 'rcc' }, null, {});
    await queryInterface.dropTable('ministeries', { schema: 'rcc' });
  }
};
