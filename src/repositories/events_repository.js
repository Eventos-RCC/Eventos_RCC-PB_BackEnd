import Diocese from '../models/diocese_models.js';
import User from '../models/user_models.js';
import {Events, TypeEvents} from '../models/event_models.js';

import CustomError from '../utils/CustomError.js';
import logger from '../utils/logger.config.js';
import { Sequelize } from 'sequelize';

class EventsRepository {
    async createEvent(name, description, start_date, end_date, zip_code, location_name, event_type, status, registration_deadline, max_participants, diocese_id, user_created_id) {
        try {
            console.log(name, description, start_date, end_date, zip_code, location_name, event_type, status, registration_deadline, max_participants, diocese_id, user_created_id)
            return await Events.create({ name, description, start_date, end_date, zip_code, location_name, event_type, status, registration_deadline, max_participants, diocese_id, user_created_id })
        } catch (error) {
            console.log('Erro ao criar evento:', error);
            logger.error('Error creating event:', error);

            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new CustomError('Event already registered', 409);
            }
            throw new CustomError('Error creating event', 500);
        }

    }
    
    async findOrCreateEventType (typeEvent) {
        try {
            return await TypeEvents.findOrCreate({
                where: Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.col('name')),
                    typeEvent.toLowerCase()
                ),
            })
        } catch (error) {
            logger.error(`Error finding event by type in repository: ${error.message}`);
            throw new CustomError('Error accessing database', 500);
        }
    }

    async findAllEvents() {
        try {
            return await Events.findAll({
                include: [
                    {
                        model: User,
                        as: 'user_created',
                        attributes: ['id', 'name', 'email'],
                    },
                    {
                        model: Diocese,
                        as: 'diocese',
                        attributes: ['id', 'name'],
                    },
                    {
                        model: TypeEvents,
                        as: 'event_type',
                        attributes: ['id', 'name'],
                    },
                ],
            });
        }catch (error) {
            logger.error(`Error finding all events in repository: ${error.message}`);
            throw new CustomError('Error accessing database', 500);
        }
    }

}


export default new EventsRepository();