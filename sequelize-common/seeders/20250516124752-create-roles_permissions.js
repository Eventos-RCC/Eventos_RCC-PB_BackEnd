'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    // para o system admin que terá acesso a tudo
    const rolePermissionsData = [
      // system_admin (ID: 1) - Acesso total (todas as permissões de 1 a 18)
      ...Array.from({ length: 18 }, (_, i) => ({
        role_id: 1,
        permission_id: i + 1
      })),

      // event_creator estadual (ID: 2) - Papel "Master"
      { role_id: 2, permission_id: 1 }, // create:event
      { role_id: 2, permission_id: 2 }, // read:event (seus próprios e outros)
      { role_id: 2, permission_id: 3 }, // update:event (seus próprios)
      { role_id: 2, permission_id: 4 }, // delete:event (seus próprios)
      { role_id: 2, permission_id: 5 }, // archive:event (seus próprios)
      { role_id: 2, permission_id: 6 }, // manage:event_registration (para seus eventos)
      { role_id: 2, permission_id: 7 }, // read:event_participant_count (para seus eventos)
      { role_id: 2, permission_id: 8 }, // create:team (para seus eventos)
      { role_id: 2, permission_id: 9 }, // manage:team (para seus eventos)
      { role_id: 2, permission_id: 10 }, // assign:team_member (para seus eventos)
      { role_id: 2, permission_id: 11 }, // remove:team_member (para seus eventos)
      { role_id: 2, permission_id: 12 }, // read:team_member (para seus eventos)
      { role_id: 2, permission_id: 14 }, // read:event_registration (para seus eventos)
      { role_id: 2, permission_id: 15 }, // read:event (seus próprios e outros)
      { role_id: 2, permission_id: 16 }, // read:user (para seus eventos)
      // Pode ter permissão para ver usuários (read:user) para adicionar como event_admin
      { role_id: 2, permission_id: 13 }, // read:user
      { role_id: 2, permission_id: 18 }, // read:team (para seus eventos)

      // event_creator diocesano (ID: 3) - Papel dos corrdenadores diocesanos criarem eventos nas dioceses
      { role_id: 3, permission_id: 1 },
      { role_id: 3, permission_id: 2 },
      { role_id: 3, permission_id: 3 },
      { role_id: 3, permission_id: 4 },
      { role_id: 3, permission_id: 5 },
      { role_id: 3, permission_id: 6 },
      { role_id: 3, permission_id: 7 },
      { role_id: 3, permission_id: 8 },
      { role_id: 3, permission_id: 9 },
      { role_id: 3, permission_id: 10 },
      { role_id: 3, permission_id: 11 },
      { role_id: 3, permission_id: 12 },
      { role_id: 3, permission_id: 14 },
      { role_id: 3, permission_id: 15 },
      { role_id: 3, permission_id: 16 },
      { role_id: 3, permission_id: 18 },

      // event_creator local (ID - 4) - Papel dos corrdenadores locais criarem eventos nas cidades
      { role_id: 4, permission_id: 1 },
      { role_id: 4, permission_id: 2 },
      { role_id: 4, permission_id: 3 },
      { role_id: 4, permission_id: 4 },
      { role_id: 4, permission_id: 5 },
      { role_id: 4, permission_id: 6 },
      { role_id: 4, permission_id: 7 },
      { role_id: 4, permission_id: 8 },
      { role_id: 4, permission_id: 9 },
      { role_id: 4, permission_id: 10 },
      { role_id: 4, permission_id: 11 },
      { role_id: 4, permission_id: 12 },
      { role_id: 4, permission_id: 14 },
      { role_id: 4, permission_id: 15 },
      { role_id: 4, permission_id: 16 },
      { role_id: 4, permission_id: 18 },

      // event_admin (ID: 5) - Administrador de evento específico
      { role_id: 5, permission_id: 2 },
      { role_id: 5, permission_id: 3 },
      { role_id: 5, permission_id: 6 },
      { role_id: 5, permission_id: 7 },
      { role_id: 5, permission_id: 8 },
      { role_id: 5, permission_id: 9 },
      { role_id: 5, permission_id: 10 },
      { role_id: 5, permission_id: 11 },
      { role_id: 5, permission_id: 12 },
      { role_id: 5, permission_id: 13 },
      { role_id: 5, permission_id: 14 },
      { role_id: 5, permission_id: 15 },
      { role_id: 5, permission_id: 16 },
      { role_id: 5, permission_id: 18 },

      // team_coordinator (ID: 6) - Coordenador de equipe específica
      { role_id: 6, permission_id: 9 },
      { role_id: 6, permission_id: 10 },
      { role_id: 6, permission_id: 11 },

      // registered_user (ID: 7) - Usuário comum
      { role_id: 7, permission_id: 2 }
    ];

    await queryInterface.bulkDelete({ tableName: 'roles_permissions', schema: 'rcc' }, null, {});
    await queryInterface.bulkInsert({ tableName: 'roles_permissions', schema: 'rcc' }, rolePermissionsData);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'roles_permissions', schema: 'rcc' }, null, {});
  }
};
