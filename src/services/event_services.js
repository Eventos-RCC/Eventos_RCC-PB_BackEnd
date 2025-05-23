import userRepository from '../repositories/user_repository.js';
import dioceseRepository from '../repositories/diocese_repository.js';
import eventRepository from '../repositories/events_repository.js';

import logger from '../utils/logger.config.js';
import CustomError from '../utils/CustomError.js';
import events_repository from '../repositories/events_repository.js';


const create_event = async (body) => {
    logger.info('Creating event');
    const { name, description, start_date, end_date, event_type, diocese, user_created_id } = body;

    if (!name || !diocese || !start_date || !end_date || !event_type || !user_created_id) {
        logger.error('Missing required fields');
        throw new CustomError('Missing required fields', 400);
    }

    if (start_date >= end_date) {
        logger.error('Start date must be before end time');
        throw new CustomError('Start date must be before end time', 400);
    }

    const diocese_id = await dioceseRepository.findDioceseByName(diocese);
    if (!diocese_id) {
        logger.error('Diocese not found');
        throw new CustomError('Diocese not found', 400);
    }

    const event_type_id = await events_repository.findTypeEvent(event_type);
    if (!event_type_id) {
        logger.error('Event type not found');
        throw new CustomError('Event type not found', 400);
    }
    
    logger.info('Creating event');
    const creatingEvent = await events_repository.createEvent(name, description, start_date, end_date, event_type_id.id,  diocese_id.diocese_id, user_created_id);
    if (!creatingEvent) {
        logger.error('Error creating event');
        throw new CustomError('Error creating event', 400);
    }

    logger.info('Event created successfully');
    return {
        message: 'Event created successfully',
        event: {
            id: creatingEvent.id,
            name: creatingEvent.name,
            description: creatingEvent.description,
            diocese: creatingEvent.diocese.name,
            type_event: creatingEvent.event_types.name,
            start_date: creatingEvent.start_date,
            end_date: creatingEvent.end_date,
            status: creatingEvent.status,
            criador: creatingEvent.users.username,
            createdEvent: creatingEvent.createdAt,
            updatedEvent: creatingEvent.updatedAt,
        }
    };
    
}

const findAllEvents = async () => {
    logger.info('Fetching all events');
    const events = await events_repository.findAllEvents();
    if (!events) {
        logger.error('No events found');
        throw new CustomError('No events found', 404);
    }

    logger.info('Events fetched successfully');
    return {
        message: 'Events fetched successfully',
        events: events
    };
}

const deleteEvent = async (event_id) => {
    logger.info('Deleting event');

    const findEvent = await eventRepository.findEventById(event_id);
    if (!findEvent) {
        logger.error('Event not found or already deleted');
        throw new CustomError('Event not found or already deleted', 404);
    }

    const deletedEvent = await eventRepository.deleteEvent(event_id);
    if (!deletedEvent) {
        logger.error('Error deleting event');
        throw new CustomError('Error deleting event', 400);
    }

    logger.info('Event deleted successfully');
    return {
        message: 'Event deleted successfully'
    };
}

const find_event_by_id = async (id_event) => {
    logger.info('Fetching event by ID');
    const event = await eventRepository.findEventById(id_event);

    if (!event) {
        logger.error('Event not found or already deleted');
        throw new CustomError('Event not found or already deleted', 404);
    }

    logger.info('Event fetched successfully');
    return {
        message: 'Event fetched successfully',
        event
    };
}

const updateOrCreateAdressEvent = async (event_id, adress_id, body) => {
    logger.info('Updating or creating address for event');

    if (Object.keys(body).length === 0) {
        logger.error('No fields provided for update');
        throw new CustomError('No fields provided for update', 400);
    }

    const event = await eventRepository.findEventById(event_id);
    if (!event) {
        logger.error('Event not found or already deleted');
        throw new CustomError('Event not found or already deleted', 404);
    }

    const { street, number, city, state, zip_code, complement } = body;

    let address;
    if (!adress_id) {
        if (!street || !number || !city || !state || !zip_code) {
            logger.error('Missing required fields');
            throw new CustomError('Missing required fields', 400);
        }
        address = await eventRepository.updateOrCreateAdress(event_id, body, adress_id);
        logger.info('Address created successfully');
    } else {
        address = await eventRepository.updateOrCreateAdress(event_id, body, adress_id);
        logger.info('Address updated successfully');
    }

    return {
        message: adress_id ? 'Address created successfully' : 'Address updated successfully',
        address: {
            id: address.id,
            street: address.street,
            number: address.number,
            city: address.city,
            state: address.state,
            zip_code: address.zip_code,
            complement: address.complement,
            event_id: address.event_id
        }
    };
};

export default {
    create_event,
    findAllEvents,
    deleteEvent,
    find_event_by_id,
    updateOrCreateAdressEvent
}