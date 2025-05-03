import User from '../models/user_models.js';
import CustomError from '../utils/CustomError.js';
import logger from '../utils/logger.config.js';
import Diocese from '../models/diocese_models.js';


class UserRepository {
    async createUser(username, email, password, phone, birth_date, diocese_id) {
        try {
            console.log('Dados para criação do usuário:', { username, email, password, phone, birth_date, diocese_id });
            return await User.create({username, email, password, phone, birth_date, diocese_id,});
        } catch (error) {
            console.log('Erro ao criar usuário:', error);
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
                    attributes: ['diocese_id', 'name']
                }],
                raw: true,
                nest: true
            });
            if (!user) {
                throw new CustomError('User not found', 404);
            }
            return user;
        } catch (error) {
            logger.error(`Error finding user by ID in repository: ${error.message}`);
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