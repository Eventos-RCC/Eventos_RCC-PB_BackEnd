import userModels from '../models/user_models.js';
import dioceseModels from '../models/diocese_models.js';
import globalmiddleware from '../middlwares/global_middlewares.js';
import bcrypt from 'bcrypt';
import logger from '../utils/logger.config.js';
import CustomError from '../utils/CustomError.js';
import { generateRegistrationId, formatDateForDatabase, verify_code } from '../utils/basicFunctions.js';
import redis from '../models/userRedis.js';
import emailUtils from '../utils/emailUtils.js';

const initiateUserRegistration = async (body) => {
    logger.info('Creating user');
    const { name, email, password, phone, birth_date, name_diocese} = body;

    if (!name || !email || !password || !phone || !birth_date || !name_diocese) {
        logger.error('All fields are required');
        throw new CustomError('All fields are required', 400);
    }

    const existingUser = await userModels.find_user_by_email(email);
    if (existingUser) {
        logger.error('Email already registered');
        throw new CustomError('Email already registered', 409);
    }

    const diocese_id = await dioceseModels.find_diocese_by_name(name_diocese);
    if (!diocese_id) {
        logger.error('Diocese not found');
        throw new CustomError('Diocese not found', 400);
    }

    const registration_id = await generateRegistrationId(diocese_id);
    if (!registration_id) {
        logger.error('Error generating registration ID');
        throw new CustomError('Error generating registration ID');
    }

    const formattedBirthDate = formatDateForDatabase(birth_date);

    if (password.length > 20 || password.length < 6) {
        logger.error('Password must be between 6 and 20 characters');
        throw new Error('Password must be between 6 and 20 characters', 400);
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const userDataToCache = {
        name,
        email,
        password: hashed_password,
        phone,
        birth_date: formattedBirthDate,
        diocese_id: diocese_id.diocese_id,
        registration_id: registration_id,
    };

    logger.info('Saving data to Redis');
    const cacheResult = await redis.dataSave('User_data', email, userDataToCache, 1200);
    if (!cacheResult) {
        logger.error('Error saving data to Redis');
        throw new CustomError('Error saving data to Redis', 400);
    }

    const verificationCodeSend = await emailUtils.sendVerificationCodeToRedis(email);
    if (!verificationCodeSend) {
        logger.error('Error sending verification code');
        throw new CustomError('Error sending verification code', 400);
    }

    logger.info('Verification code sent to email');
    const response = await emailUtils.sendCodeToEmail(email, verificationCodeSend)
}


const confirmVerificationCodeAndCreateUser = async (body, email) => {
    logger.info('verifying code');
    const { codeUser, review_code } = body;

    if (!codeUser || !review_code) {
        logger.error("aqui não");
        throw new CustomError("", 400);
    }

    const isValid = await verify_code(email, codeUser);
    if (!isValid) {
        logger.error('Code Invalid');
        throw new CustomError('Code Invalid', 400);
    }
    
    const cachedUserData = await redis.getData('User_data', email);
    if (!cachedUserData) {
        logger.error('Os dados do usuário expiraram ou são inválidos.');
        throw new CustomError('Os dados do usuário expiraram ou são inválidos.', 400);
    }

    const { name, password, phone, birth_date, diocese_id, registration_id } = cachedUserData;

    const createdUser = await userModels.create_user(registration_id, name, email, password, phone, birth_date, diocese_id);
    if (!createdUser) {
        logger.error('Error creating user or missing required fields user');
        throw new CustomError('Error Error creating user or missing required fields user', 400);
    }

    const token = await globalmiddleware.generateToken(createdUser.registration_id, createdUser.niveluser);
    if (!token) {
        logger.error('Error generating token');
        throw new CustomError('Error generating token', 400);
    }

    logger.info('User created successfully');
    return {
        user: {
            registration_id: createdUser.registration_id,
            name: createdUser.name,
            email: createdUser.email,
            phone: createdUser.phone,
            birth_date: createdUser.birth_date,
            diocese_id: createdUser.diocese_id,
            niveluser: createdUser.niveluser
        },
        token: token
    }
}


export default {
    initiateUserRegistration,
    confirmVerificationCodeAndCreateUser
}