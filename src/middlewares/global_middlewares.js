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
            expiresIn: 43200 // 12 hours
        }
    );
};

const jwtRequired = (req, res, next) => {
    const token = req.header('authorization')?.split(' ')[1];
    if (!token) {
        logger.warn('Access denied. No token provided.');
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
   try {
        const decoded = jwt.verify(token, process.env.SECRETJWT);
        req.registration_id = decoded.registration_id;
        req.niveluser = decoded.niveluser;
       req.email = decoded.email;
       next();
    } catch (error) {
        logger.error('Invalid token.');
        return res.status(401).json({ message: 'Invalid token.' });
    }
};

const isMaster = async (req, res, next) => {
    if (req.niveluser !== 'master') {
        logger.warn('Access denied. User is not a master.');
        return res.status(403).json({ message: 'Access denied. User not allowed to create events'});
    }
    next();
};


export default {
    generateToken,
    jwtRequired,
    isMaster
}