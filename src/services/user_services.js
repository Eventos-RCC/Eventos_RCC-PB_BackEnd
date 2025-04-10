import userModels from '../models/user_models.js';
import dioceseModels from '../models/diocese_models.js';
import globalmiddleware from '../middlwares/global_middlewares.js';
import bcrypt from 'bcrypt';
import logger from '../logger/logger.config.js';


const generateRegistrationId = async (diocese_id) => {
    logger.info('Generating registration_id');
    try {

        const randomPart = Math.floor(1000 + Math.random() * 9000).toString().trim();
        const dioceseIdPart = diocese_id.diocese_id.toString().trim();
        const registration_id = parseInt(`${randomPart}${dioceseIdPart}`);

        const existingUser = await userModels.find_user_by_registration_id(registration_id);
        if (existingUser) {
            return generateRegistrationId(diocese_id);
        }

        return registration_id;

    }catch (error) {
        logger.error('Erro ao gerar registration_id:', error);
        throw new Error('Erro ao gerar registration_id');
    }
}

const formatDateForDatabase = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`; // Retorna no formato yyyy-mm-dd
};

const creat_user = async (body) => {
    logger.info('Creating user');
    const { name, email, password, phone, birth_date, name_diocese} = body;

    if (!name || !email || !password || !phone || !birth_date || !name_diocese) {
        logger.error('All fields are required');
        throw new Error('All fields are required');
    }

    const verify_email_registration = await userModels.find_user_by_email(email);
    if (verify_email_registration) {
        logger.error('Email already registered');
        throw new Error('Email already registered');
    }

    const diocese_id = await dioceseModels.find_diocese_by_name(name_diocese);
    if (!diocese_id) {
        logger.error('Diocese not found');
        throw new Error('Diocese not found');
    }

    const registration_id = await generateRegistrationId(diocese_id);
    if (!registration_id) {
        logger.error('Error generating registration ID');
        throw new Error('Error generating registration ID');
    }

    const birth_formated = formatDateForDatabase(birth_date);

    if (password.length > 20 || password.length < 6) {
        logger.error('Password must be between 6 and 20 characters');
        throw new Error('Password must be between 6 and 20 characters');
    }

    const hashed_password = await bcrypt.hash(password, 10);

    const user_rcc = await userModels.create_user(registration_id, name, email, hashed_password, phone, birth_formated, diocese_id.diocese_id);
    if (!user_rcc) {
        logger.error('Error creating user or missing required fields user');
        throw new Error('Error Error creating user or missing required fields user');
    }

    const generateToken = await globalmiddleware.generateToken(user_rcc.registration_id, user_rcc.niveluser);
    if (!generateToken) {
        logger.error('Error generating token');
        throw new Error('Error generating token');
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