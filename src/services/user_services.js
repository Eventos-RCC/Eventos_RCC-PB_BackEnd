import userModels from '../models/user_models.js';
import dioceseModels from '../models/diocese_models.js';
import globalmiddleware from '../middlewares/global_middlewares.js';
import bcrypt from 'bcrypt';
import logger from '../utils/logger.config.js';
import CustomError from '../utils/CustomError.js';
import { generateRegistrationId, formatDateForDatabase } from '../utils/basicFunctions.js';
import redis from '../models/userRedis.js';
import emailUtils from '../utils/emailUtils.js';
import { sendVerificationCodeToRedis,  verify_code } from '../utils/functionsToRedis.js';

const initiateUserRegistration = async (body) => {
    logger.info('Creating user');
    const { name, email, password, phone, birthdate, diocese} = body;

    if (!name || !email || !password || !phone || !birthdate || !diocese) {
        logger.error('All fields are required');
        throw new CustomError('All fields are required', 400);
    }

    const verify_email_registration = await userModels.find_user_by_email(email);
    if (verify_email_registration && verify_email_registration.isActivity === true) {
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

    const formattedBirthDate = formatDateForDatabase(birthdate);

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
        birth: formattedBirthDate,
        diocese_id: diocese_id.diocese_id,
        registration_id: registration_id,
    };

    logger.info('Saving data to Redis');
    const cacheResult = await redis.dataSave('User_data', email, userDataToCache, 1200);
    if (!cacheResult) {
        logger.error('Error saving data to Redis');
        throw new CustomError('Error saving data to Redis', 400);
    }

    const verificationCodeSend = await sendVerificationCodeToRedis(email);
    if (!verificationCodeSend) {
        logger.error('Error sending verification code');
        throw new CustomError('Error sending verification code', 400);
    }

    logger.info('Verification code sent to email');
    const response = await emailUtils.sendCodeToEmail(email, verificationCodeSend)

    return { message: "Código enviado para o email", email };
}


const confirmVerificationCodeAndCreateUser = async (body, email) => {
    logger.info('verifying code');
    const { codeUser, resendCode } = body;

    if (resendCode === true) {
        const verificationCodeSend = await sendVerificationCodeToRedis(email);
        if (!verificationCodeSend) {
            logger.error('Error sending verification code');
            throw new CustomError('Error sending verification code', 400);
        }

        logger.info('Verification code sent to email');
        await emailUtils.sendCodeToEmail(email, verificationCodeSend)
        return { message: "Código enviado para o email", email };
    }

    if (!codeUser) {
        logger.error("Verification code is required");
        throw new CustomError("Verification code is required", 400);
    }

    const isValid = await verify_code(email, codeUser);
    if (!isValid) {
        logger.error('Invalid or inspired code');
        throw new CustomError('Invalid or inspired code', 400);
    }
    
    const cachedUserData = await redis.getData('User_data', email);
    if (!cachedUserData) {
        logger.error('User data has expired or is invalid.');
        throw new CustomError('User data has expired or is invalid.', 400);
    }

    const { name, password, phone, birth, diocese_id, registration_id } = cachedUserData;

    const createdUser = await userModels.create_user(registration_id, name, email, password, phone, birth, diocese_id);
    if (!createdUser) {
        logger.error('Error creating user or missing required fields user');
        throw new CustomError('Error Error creating user or missing required fields user', 400);
    }

    await redis.delData('User_data', email);
    await redis.delData('verification_code', email);

    console.log(createdUser.registration_id);
    console.log(registration_id)
    const token = await globalmiddleware.generateToken(createdUser.registration_id, createdUser.niveluser, email);
    if (!token) {
        logger.error('Error generating token');
        throw new CustomError('Error generating token', 400);
    }

    logger.info('User created successfully');
    return {
        message: "Código verificado com Sucesso. Usuário cadastrado: ",
        user: {
            registration_id: createdUser.registration_id,
            name: createdUser.name,
            email: createdUser.email,
            phone: createdUser.phone,
            birth: createdUser.birth,
            diocese_id: createdUser.diocese_id,
            niveluser: createdUser.niveluser
        },
        token: token
    }
}

const login = async (body) => {
    logger.info('Logging in user');
    const { email, password } = body;

    if (!email || !password) {
        logger.error('Email and password are required');
        throw new CustomError('Email and password are required', 400);
    }

    const user = await userModels.find_user_by_email(email);
    if (!user || user.isActivity === false) {
        logger.error('User not found');
        throw new CustomError('User not found', 404);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        logger.error('Email or password is incorrect');
        throw new CustomError('Email or password is incorrect', 401);
    }

    const token = await globalmiddleware.generateToken(user.registration_id, user.niveluser, user.email);
    if (!token) {
        logger.error('Error generating token');
        throw new CustomError('Error generating token', 400);
    }

    logger.info('User logged in successfully');
    return {
        message: "Login successful",
        token: token
    }
}


export default {
    initiateUserRegistration,
    confirmVerificationCodeAndCreateUser,
    login
}