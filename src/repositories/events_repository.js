import Diocese from '../models/diocese_models.js';
import User from '../models/user_models.js';
import { Events, TypeEvents } from '../models/event_models.js';
import Adress from '../models/adresses_models.js';

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
            const events =  await Events.findAll({
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
                        model: Adress,
                        as: 'adresses',
                        attributes: ['id', 'street', 'number', 'city', 'state', 'zip_code', 'complement'],
                    }
                ], 
                where: {
                    status: {
                        [Sequelize.Op.ne]: 'deleted'
                    }
                }
            });

            if(events.length === 0) {
                return false;
            }

            return events;
        } catch (error) {
            logger.error(`Error finding all events in repository: ${error.message}`);
            throw new CustomError('Error accessing database', 500);
        }
    }

    async findEventById(eventId) {
        try {
            const events = await Events.findOne({
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
                    },
                    {
                        model: Adress,
                        as: 'adresses',
                        attributes: ['id', 'street', 'number', 'city', 'state', 'zip_code', 'complement'],
                    }
                ], 
                where: {
                    id: eventId,
                    status: {
                        [Sequelize.Op.ne]: 'deleted'
                    }
                }
            });

            return events;
        } catch (error) {
            logger.error(`Error finding event by ID in repository: ${error.message}`);
            throw new CustomError('Error accessing database', 500);
        }
    }

    async deleteEvent(eventId) {
        try {
            return await Events.update({ status: 'deleted' }, {
                where: { id: eventId },
            })
        } catch(error){
            logger.error(`Error deleting event in repository: ${error.message}`);
            throw new CustomError('Error deleting event', 500);
        }
    }

    async updateOrCreateAdress(event_id, body, adressId) {
        const { street, number, city, state, zip_code, complement } = body;
        try {
            if (adressId === undefined) {
                const newAdress = await Adress.create({
                    type_adress: 'events', event_id, street, number, city, state, zip_code, complement
                });
                return newAdress;
            } else {
                const [rowsUpdated, [updatedAdress]] = await Adress.update(
                    { street, number, city, state, zip_code, complement },
                    {
                        where: { event_id: event_id, id:  adressId},
                        returning: true,
                    }
                );
                if (rowsUpdated === 0) {
                    throw new CustomError('Address not found for the given event ID', 404);
                }
                return updatedAdress;
            }
        } catch (error) {
            logger.error(`Error updating or creating address in repository: ${error.message}`);
            throw new CustomError('Error accessing database', 500);
        }
    }

}


export default new EventsRepository();