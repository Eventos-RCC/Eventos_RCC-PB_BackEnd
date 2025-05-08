import Diocese from '../models/diocese_models.js';
import CustomError from '../utils/CustomError.js';
import logger from '../utils/logger.config.js';

class DioceseRepository {
    async findDioceseByName(name) {
        try {
            const result = await Diocese.findOne({
                where: {
                    name: name
                },
                attributes: ['diocese_id'],
                raw: true
            });
            return result;
        } catch (error) {
            logger.error(`Error finding diocese by name in repository: ${error.message}`);
            throw new CustomError('Error accessing database', 500);
        }
    }
 }


export default new DioceseRepository();