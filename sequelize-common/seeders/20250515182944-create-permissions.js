'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const permissionsData = [
      {
        action: 'create',
        resource: "event",
        description: "Criar novos eventos",
      },
      {
        action: "read",
        resource: "event",
        description: "Visualizar detalhes de eventos",
      },
      {
        action: "update",
        resource: "event",
        description: "Atualizar informações de eventos",
      },
      {
        action: "delete",
        resource: "event",
        description: "Excluir eventos",
      },
      {
        action: "archive",
        resource: "event",
        description: "Arquivar eventos",
      },
      {
        action: "manage",
        resource: "event_registration",
        description: "Gerenciar inscrições em eventos",
      },
      {
        action: "read",
        resource: "event_participant_count",
        description: "Visualizar a contagem de participante em eventos",
      },

      // permissoes relacionadas as equipes
      {
        action: "create",
        resource: "team",
        description: "Criar equipes para eventos",
      },
      {
        action: "manage",
        resource: "team",
        description: "Gerenciar equipes dos eventos",
      },
      {
        action: "assign",
        resource: "team_member",
        description: "Atribuir membros as equipes",
      },
      {
        action: "remove",
        resource: "team_member",
        description: "Remover membros as de equipes",
      },

      // permissoes relacionadas a fazer inscricao de usuarios
      {
        action: "create",
        resource: "user_event",
        description: "Cadastrar um usuário em um evento sem cadastrálo como usuário do sistema",
      },
      {
        action: "read",
        resource: "user_event",
        description: "Visualizar detalhes de um usuário em um evento",
      },
      {
        action: "update",
        resource: "user_event",
        description: "Atualizar informações de um usuário em um evento",
      },
      {
        action: "delete",
        resource: "user_event",
        description: "Excluir um usuário de um evento",
      },
      {
        action: 'assign',
        resource: "user_role",
        description: "Atribuir um papel a um usuário",
      },

      // permissoes relacionada a dioceses

      {
        action: 'manage',
        resource: "diocese",
        description: "Gerenciar dioceses",
      },

      // permissoes relacionadas a gerar relatorios

      {
        action: "generate",
        resource: "report",
        description: "Gerar relatórios",
      },
    ];

    await queryInterface.bulkInsert({tableName: 'permissions', schema: 'rcc' }, permissionsData);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({tableName: 'permissions', schema: 'rcc' }, null, {});
  }
};
