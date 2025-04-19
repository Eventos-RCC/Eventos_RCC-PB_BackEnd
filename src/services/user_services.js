import userModels from '../models/user_models.js';
import dioceseModels from '../models/diocese_models.js';
import globalmiddleware from '../middlwares/global_middlewares.js';
import bcrypt from 'bcrypt';
import logger from '../utils/logger.config.js';
import CustomError from '../utils/CustomError.js';
import { generateRegistrationId, formatDateForDatabase } from '../utils/basicFunctions.js';

const creat_user = async (body) => {
    logger.info('Creating user');
    const { name, email, password, phone, birthdate, diocese} = body;

    if (!name || !email || !password || !phone || !birthdate || !diocese) {
        logger.error('All fields are required');
        throw new CustomError('All fields are required', 400);
    }

    const verify_email_registration = await userModels.find_user_by_email(email);
    if (verify_email_registration) {
        logger.error('Email already registered');
        throw new CustomError('Email already registered', 409);
    }

    const diocese_id = await dioceseModels.find_diocese_by_name(diocese);
    if (!diocese_id) {
        logger.error('Diocese not found');
        throw new CustomError('Diocese not found', 400);
    }

    const registration_id = await generateRegistrationId(diocese_id);
    if (!registration_id) {
        logger.error('Error generating registration ID');
        throw new CustomError('Error generating registration ID');
    }

    const birth_formated = formatDateForDatabase(birthdate);

    if (password.length > 20 || password.length < 6) {
        logger.error('Password must be between 6 and 20 characters');
        throw new Error('Password must be between 6 and 20 characters', 400);
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const user_rcc = await userModels.create_user(registration_id, name, email, hashed_password, phone, birth_formated, diocese_id.diocese_id);
    if (!user_rcc) {
        logger.error('Error creating user or missing required fields user');
        throw new CustomError('Error Error creating user or missing required fields user', 400);
    }

    const generateToken = await globalmiddleware.generateToken(user_rcc.registration_id, user_rcc.niveluser);
    if (!generateToken) {
        logger.error('Error generating token');
        throw new CustomError('Error generating token', 400);
    }

    logger.info('User created successfully');
    return {
        user: {
            registration_id: user_rcc.registration_id,
            name: user_rcc.name,
            email: user_rcc.email,
            phone: user_rcc.phone,
            birth_date: user_rcc.birth_date,
            diocese_id: user_rcc.diocese_id,
            niveluser: user_rcc.niveluser
        },
        token: generateToken
    }
}


export default {
    creat_user
}