'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const RolePermission = [
      {
        
        name: 'system_admin',
        description: 'Administrador do sistema com acesso total',
      },
      {
        name: 'event_creator_estadual',
        description: 'Usuário com permissão para criar e gerenciar eventos estaduais',
      },
      {
        name: 'event_creator_diocesanos',
        description: 'Usuário com permissão para criar e gerenciar eventos diocesanos e locais',
      },
      {
        name: 'event_creator_local',
        description: 'Usuário com permissão para criar e gerenciar eventos locais',
      },
      {
        name: 'event_admin',
        description: 'Administrador de um evento específico, designado pelo event_creator',
      },
      {
        name: 'team_coordinator',
        description: 'Coordenador de uma equipe de trabalho, com acesso a eventos específicos',
      },
      {
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
