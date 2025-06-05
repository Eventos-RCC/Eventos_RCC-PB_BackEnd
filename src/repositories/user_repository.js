import User from '../models/user_models.js';
import Diocese from '../models/diocese_models.js';
import Adress from '../models/adresses_models.js';
import { Role, Permission } from '../models/roles_models.js';

import CustomError from '../utils/CustomError.js';
import logger from '../utils/logger.config.js';


class UserRepository {
    async createUser(username, email, password, phone, birth_date, diocese_id) {
        try {
            return await User.create({username, email, password, phone, birth_date, diocese_id,});
        } catch (error) {
            logger.error('Error creating user:', error);

            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new CustomError('Email already regitred', 409);
            }
            throw new CustomError('Error creating user', 500);
        }
    }
    
    async findUserByEmail(email) {
        try {
            const user = await User.findOne({
                where: { email: email, status: 'active' },
                include: [{
                    model: Diocese,
                    as: 'diocese',
                    attributes: ['diocese_id', 'name']
                },{
                    model: Adress,
                    as: 'adresses',
                    attributes: ['id', 'street', 'number', 'city', 'state', 'zip_code', 'complement']
                }],
                raw: true,
                nest: true
            });
            return user;
        } catch (error) {
            logger.error(`Error finding user by email in repository: ${error.message}`);
            throw new CustomError('Error accessing database', 500);
        }
    }

    async findUserById(userId) {
        try {
            const user = await User.findByPk(userId, {
                where: { status: 'active' },
                include: [{
                    model: Diocese,
                    as: 'diocese',
                    attributes: ['diocese_id', 'name']
                }, { 
                    model: Adress,
                    as: 'adresses',
                    attributes: ['id', 'street', 'number', 'city', 'state', 'zip_code', 'complement']
                }, {
                    model: Role,
                    as: 'roles',
                    attributes: ['id', 'name'],
                    include: [
                        {
                            model: Permission,
                            as: 'permissions',
                            attributes: ['id', 'action', 'resource'],
                            through: {attributes: []} // Exclui os atributos da tabela intermediária
                        }
                    ]
                }]
            });
            return user;
        } catch (error) {
            logger.error(`Error finding user by ID in repository: ${error.message}`);
            throw new CustomError('Error accessing database', 500);
        }
    }

    async updateOrCreateUserAdress(user_id, body, adress_id) {
        const { street, number, city, state, zip_code, complement } = body;
        try {
            if (adress_id === undefined) {
                const newAdress = await Adress.create({
                    type_adress: 'users', user_id, street, number, city, state, zip_code, complement
                });
                return newAdress;
            } else {
                const [rowsUpdated, [updateUser]] = await User.update(
                    { street, number, city, state, zip_code, complement },
                    {
                        where: { user_id: user_id, id: adress_id },
                        returning: true
                    }
                );
                if (rowsUpdated === 0) {
                    throw new CustomError('Address not found for the given event ID', 404);
                }
            }
        } catch (err) {
            logger.error(`Error updating or creating address in repository: ${err.message}`);
            throw new CustomError('Error accessing database', 500);
        }
    }

    async updateUser(userId, updateData) {
        try {
            const [updatedRows] = await User.update(updateData, {
                where: { user_id: userId, status: 'active'},
            });
            if (updatedRows === 0) {
                throw new CustomError('User not found or no changes made', 404);
            }
            return await this.findUserById(userId);
        } catch (error) {
            logger.error(`Error updating user in repository: ${error.message}`);
            throw new CustomError('Error accessing database', 500);
        }
    }

}

export default new UserRepository();