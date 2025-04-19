import userModels from '../models/user_models.js';
import jwt from 'jsonwebtoken';

const generateToken = async (registration_id, niveluser) => {
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