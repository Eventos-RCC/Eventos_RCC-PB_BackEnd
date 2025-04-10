import userModels from '../models/user_models.js';
import jwt from 'jsonwebtoken';
import logger from '../logger/logger.config.js';

const generateToken = async (registration_id, niveluser) => {
    logger.info(`Generating token`);
    return jwt.sign(
        {
            registration_id: registration_id.registration_id,
            niveluser: niveluser.niveluser
        },
        process.env.SECRETJWT, {
            expiresIn: 86400 // 24 hours
        }
    );
};


export default {
    generateToken
}