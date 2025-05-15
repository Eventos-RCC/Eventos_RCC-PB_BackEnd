'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const RolePermission = [
      {
        id: uuidv4(),
        name: 'system_admin',
        description: 'Administrador do sistema com acesso total',
      },
      {
        id: uuidv4(),
        name: 'event_creator_estadual',
        description: 'Usuário com permissão para criar e gerenciar eventos estaduais',
      },
      {
        id: uuidv4(),
        name: 'event_creator_diocesanos',
        description: 'Usuário com permissão para criar e gerenciar eventos diocesanos e locais',
      },
      {
        id: uuidv4(),
        name: 'event_creator_local',
        description: 'Usuário com permissão para criar e gerenciar eventos locais',
      },
      {
        id: uuidv4(),
        name: 'event_admin',
        description: 'Administrador de um evento específico, designado pelo event_creator',
      },
      {
        id: uuidv4(),
        name: 'team_coordinator',
        description: 'Coordenador de uma equipe de trabalho, com acesso a eventos específicos',
      },
      {
        id: uuidv4(),
        name: 'registered_user',
        description: 'Usuário registrado padrão, pode se inscrever em eventos',
      },
    ];

    await queryInterface.bulkDelete({ tableName: 'roles', schema: 'rcc' }, null, {});

    await queryInterface.bulkInsert({tableName: 'roles', schema: 'rcc' }, RolePermission);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({tableName: 'roles', schema: 'rcc' }, null, {});
  }
};
