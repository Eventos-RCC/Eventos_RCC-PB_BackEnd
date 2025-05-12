'use strict';

const { ENUM, DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('adresses', 'type_adress', {
      type: DataTypes.ENUM('events', 'users', 'prayer_group'),
      allowNull: false,
    });

    await queryInterface.changeColumn('adresses', 'number', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('adresses', 'type_adress', {
      type: DataTypes.ENUM('events', 'users'),
      allowNull: false
    });

    await queryInterface.changeColumn('adresses', 'number', {
      type: DataTypes.STRING,
      allowNull: false
    })
  }
};
