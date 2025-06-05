import { Role, Permission } from '../models/roles_models.js';
import userRepository from '../repositories/user_repository.js';
import logger from '../utils/logger.config.js';
import customError from '../utils/CustomError.js';

const checkPermission = (requiredPermissionString) => {
    return async (req, res, next) => {
        try {
            const userId = req.userId;
            if (!userId) {
                logger.warn('Access denied. No user ID provided.');
                return res.status(401).json({ message: 'Access denied. No user ID provided.' });
            }

            const [requiredAction, requiredResource] = requiredPermissionString.split(':');
            if (!requiredAction || !requiredResource) {
                logger.error('Invalid permission format. Expected format: action:resource');
                return next(new customError('Invalid permission format. Expected format: action:resource', 400));
            }

            const userWithPermission = await userRepository.findUserById(userId);
            if (!userWithPermission || !userWithPermission.roles) {
                logger.error('User not found or no roles assigned.');
                return next(new customError('User not found or no roles assigned.', 404));
            }

            let hasPermission = false;
            for (const role of userWithPermission.roles) {
    
                if (role.permissions) {
                    for (const permission of role.permissions) {
                        if (permission.action === requiredAction && permission.resource === requiredResource) {
                            hasPermission = true;
                            break;
                        }
                        if (permission.action === "manage" && permission.resource === requiredResource) {
                            hasPermission = true;
                            break;
                        }
                    }
                }
                if (hasPermission) break;
            }

            if (!hasPermission) {
                logger.warn(`User does not have permission: ${requiredPermissionString}`);
                return next(new customError(`Access denied. You do not have permission: ${requiredPermissionString}`, 403));
            }

            logger.info(`RBAC: Usuário ${userId} autorizado para ${requiredPermissionString}.`);
            next();
           
        } catch (error) {
            logger.error(`Error checking permissions: ${error.message}`);
            return next(new customError('Error checking permissions', 500));
        }
    };
};

export default checkPermission;