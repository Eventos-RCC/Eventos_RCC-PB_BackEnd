import logger from './logger.config.js';
import userModels from '../models/user_models.js';
import redis from '../models/userRedis.js';

const generateCodeValdation = async () => {
    logger.info('Generating code validation');
    const randomPart = Math.floor(100000 + Math.random() * 900000).toString();
    return randomPart;
 }

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



export {
    generateRegistrationId,
    formatDateForDatabase,
    generateCodeValdation
}