import jwt from 'jsonwebtoken';
import logger from '../utils/logger.config.js';
import CustomError from '../utils/CustomError.js';


const generateToken = async (userId, email) => {
    return jwt.sign(
        {
            userId: userId,
            email: email,
        },
        process.env.SECRETJWT, {
            expiresIn: 21600 // 6 hours
        }
    );
};

const jwtRequired = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        logger.warn('Access denied. No token provided.');
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
  
    try {
        const decoded = jwt.verify(token, process.env.SECRETJWT);
        req.userId = decoded.userId;
        req.email = decoded.email;

        logger.debug(`Token verified sucessfully`);

       next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            logger.warn(`Token JWT inválido recebido: ${error.message}`);

            res.clearCookie('jwt', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax', path: '/' } );
            return next(new CustomError('Sessão inválida. Por favor, faça login novamente.', 401));
        } 
        
        if (error.name === 'TokenExpiredError') {
            logger.info(`Token JWT expirado para usuário.`);
            
            res.clearCookie('jwt', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Lax', path: '/' } );
            return next(new CustomError('Sua sessão expirou. Por favor, faça login novamente.', 401));
        }
            
        logger.error(`Erro inesperado na verificação do JWT: ${error.message}`);
        return next(new CustomError('Erro interno durante a autenticação.', 500));
    }
};


export default {
    generateToken,
    jwtRequired,
}