import Diocese from '../models/diocese_models.js';
import User from '../models/user_models.js';
import {Events, TypeEvents} from '../models/event_models.js';

import CustomError from '../utils/CustomError.js';
import logger from '../utils/logger.config.js';
import { Sequelize } from 'sequelize';

class EventsRepository {
    async createEvent(name, description, start_date, end_date, event_type_id, diocese_id, created_by_user_id) {
        try {
            const event = await Events.create({ name, description, start_date, end_date, event_type_id, diocese_id, created_by_user_id })
            
            return this.findEventById(event.id);
        } catch (error) {
            console.log('Erro ao criar evento:', error);
            logger.error('Error creating event:', error);

            if (error.name === 'SequelizeUniqueConstraintError') {
                throw new CustomError('Event already registered', 409);
            }
            throw new CustomError('Error creating event', 500);
        }

    }
    
    async findTypeEvent(typeEvent) {
        try {
            return await TypeEvents.findOne({
                where: Sequelize.where(
                    Sequelize.fn('LOWER', Sequelize.cast(Sequelize.col('name'), 'TEXT')),
                    typeEvent.toLowerCase()
                ),
                raw: true,
                nest: true,
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
                        model: Diocese,
                        as: 'diocese',
                        attributes: ['diocese_id', 'name'],
                    },
                    {
                        model: TypeEvents,
                        as: 'events',
                        attributes: ['id', 'name'],
                    },
                ],
                raw: true,
                nest: true,
            });
        } catch (error) {
            logger.error(`Error finding all events in repository: ${error.message}`);
            throw new CustomError('Error accessing database', 500);
        }
    }

    async findEventById(event_id) {
        try {
            return await Events.findByPk(event_id, {
                include: [
                    {
                        model: Diocese,
                        as: 'diocese',
                        attributes: ['diocese_id', 'name'],
                    },
                    {
                        model: TypeEvents,
                        as: 'event_types',
                        attributes: ['id', 'name'],
                    },
                    {
                        model: User,
                        as: 'users',
                        attributes: ['user_id', 'username']
                    }
                ],
                raw: true,
                nest: true,
            });
        } catch (error) {
            logger.error(`Error finding event by ID in repository: ${error.message}`);
            throw new CustomError('Error accessing database', 500);
        }
    }

}


export default new EventsRepository();