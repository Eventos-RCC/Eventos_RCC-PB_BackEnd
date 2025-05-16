import { Role } from '../models/roles_models.js';

class RolesRepository { 
    async findRoleByName(name) { 
        try {
            const role = await Role.findOne({ where: { name } });
            
            return role;
        } catch (error) {
            throw new Error('Error fetching role by name');
        }
    }
}

export default new RolesRepository();