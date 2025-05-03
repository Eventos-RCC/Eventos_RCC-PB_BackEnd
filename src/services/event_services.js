import userRepository from '../repositories/user_repository.js';
import dioceseRepository from '../repositories/diocese_repository.js';
import eventModels from '../repositories/events_repository.js';

import logger from '../utils/logger.config.js';
import CustomError from '../utils/CustomError.js';
import events_repository from '../repositories/events_repository.js';


const create_event = async (body) => {
    logger.info('Creating event');
    const { name, description, start_date, end_date, zip_code, location_name, event_type, status, registration_deadline, max_participants, diocese, user_created_id } = body;

    if (!name || !location_name || !diocese || !start_date || !end_date || !event_type || !user_created_id) {
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

    logger.info('Creating event');
    const creatingEvent = await events_repository.createEvent(name, description, start_date, end_date, zip_code, location_name, event_type, status, registration_deadline, max_participants, diocese_id.diocese_id, user_created_id);
   
    if (!creatingEvent) {
        logger.error('Error creating event');
        throw new CustomError('Error creating event', 400);
    }

    const userData = await userRepository.findUserById(user_created_id);
    
    logger.info('Event created successfully');
    return {
        message: 'Event created successfully',
        event: {
            id: creatingEvent.id,
            name: creatingEvent.name,
            description: creatingEvent.description ? creatingEvent.description : "Descrição não informada",
            location: creatingEvent.location_name ? creatingEvent.location_name : "Local não informado",
            cep: creatingEvent.zip_code ? creatingEvent.zip_code : "CEP não informado",
            diocese: creatingEvent.diocese_id,
            type_event: creatingEvent.event_type,
            start_date: creatingEvent.start_date,
            end_date: creatingEvent.end_date,
            status: creatingEvent.status,
            registration_deadline: creatingEvent.registration_deadline ? creatingEvent.registration_deadline : "Prazo de inscrição não informado",
            max_participants: creatingEvent.max_participants ? creatingEvent.max_participants : "Número máximo de participantes não informado",
            criador: userData.username,
            createdEvent: creatingEvent.created_at,
            updatedEvent: creatingEvent.updated_at,
        }
    };
    
}

const find_All_events = async () => {
    logger.info('Fetching all events');
    const events = await eventModels.find_All_events();
    if (!events) {
        logger.error('No events found');
        throw new CustomError('No events found', 404);
    }

    logger.info('Events fetched successfully');
    return {
        message: 'Events fetched successfully',
        events: events.map(event => ({
            id: event.event_id,
            name: event.name,
            description: event.description,
            location: event.location,
            cep: event.local_cep,
            diocese_id: event.diocese_id,
            diocese_name: event.diocese_name,
            start_time: event.start_time,
            end_time: event.end_time,
            event_level: event.event_level,
        }))
    };
}

const deleteEvent = async (event_id) => {
    logger.info('Deleting event');

    const findEvent = await eventModels.find_event_by_id(event_id);
    if (!findEvent) {
        logger.error('Event not found or already deleted');
        throw new CustomError('Event not found or already deleted', 404);
    }

    const deletedEvent = await eventModels.deleteEvent(event_id);
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
    const event = await eventModels.find_event_by_id(id_event);

    if (!event) {
        logger.error('Event not found or already deleted');
        throw new CustomError('Event not found or already deleted', 404);
    }

    logger.info('Event fetched successfully');
    return {
        message: 'Event fetched successfully',
        event: {
            id: event.event_id,
            name: event.name,
            description: event.description,
            location: event.location,
            cep: event.local_cep,
            diocese_id: event.diocese_id,
            diocese_name: event.diocese_name,
            start_time: event.start_time,
            end_time: event.end_time,
            event_level: event.event_level,
        }
    };
}

const updateEvent = async (event_id, body) => {
    logger.info('Updating event');

    if (Object.keys(body).length === 0) {
        logger.error('No fields provided for update');
        throw new CustomError('No fields provided for update', 400);
    }

    if (body.start_time && body.end_time && body.start_time >= body.end_time) {
        logger.error('Start time must be before end time');
        throw new CustomError('Start time must be before end time', 400);
    }

    const updatedEvent = await eventModels.updateEvent(event_id, body);
    if (!updatedEvent) {
        logger.error('Error updating event');
        throw new CustomError('Error updating event', 400);
    }

    logger.info('Event updated successfully');
    return {
        message: 'Event updated successfully',
        event: {
            id: updatedEvent.event_id,
            name: updatedEvent.name,
            description: updatedEvent.description,
            location: updatedEvent.location,
            cep: updatedEvent.local_cep,
            diocese_id: updatedEvent.diocese_id,
            diocese_name: updatedEvent.diocese_name,
            start_time: updatedEvent.start_time,
            end_time: updatedEvent.end_time,
            event_level: updatedEvent.event_level,
        }
    };
}

export default {
    create_event,
    find_All_events,
    deleteEvent,
    find_event_by_id,
    updateEvent
}