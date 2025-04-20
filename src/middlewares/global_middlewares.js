import userModels from '../models/user_models.js';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger.config.js';


const generateToken = async (registration_id, niveluser, email) => {
    return jwt.sign(
        {
            registration_id: registration_id,
            niveluser: niveluser,
            email: email,
        },
        process.env.SECRETJWT, {
            expiresIn: 86400 // 24 hours
        }
    );
};



export default {
    generateToken
}