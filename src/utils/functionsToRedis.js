import bcrypt from 'bcrypt';
import logger from './logger.config.js';
import CustomError from './CustomError.js';
import redis from '../models/userRedis.js';
import { generateCodeValdation } from './basicFunctions.js';


const sendVerificationCodeToRedis = async (email) => {
    logger.info('Sending verification code');

    const code = await generateCodeValdation();
    const hashCode = await bcrypt.hash(code, 10);
    const ditc_code = {
        "code": hashCode,
    }

    const result = await redis.dataSave('verification_code', email, ditc_code, 300);
    if (!result) {
        logger.error('Error saving verification code to Redis');
        throw new CustomError('Error saving verification code to Redis', 400);
    }
    logger.info('Verification code saved to Redis');
    return code;
}

const verify_code = async (email, code) => {
    const stored_code = await redis.getData('verification_code', email)
        if (!stored_code) {
            return false
        }
    return await bcrypt.compare(code, stored_code.code);
    }

export { sendVerificationCodeToRedis, verify_code };