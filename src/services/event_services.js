import logger from '../utils/logger.config.js';
import CustomError from '../utils/CustomError.js';
import eventModels from '../models/event_models.js';
import dioceseModels from '../models/diocese_models.js';

const create_event = async (body) => {
    const { name, description, location, diocese, start_time, end_time, event_level, master_id } = body;

    if (!name || !description || !location || !diocese || !start_time || !end_time || !event_level || !master_id) {
        logger.error('Missing required fields');
        throw new CustomError('Missing required fields', 400);
    }

    if (start_time >= end_time) {
        logger.error('Start time must be before end time');
        throw new CustomError('Start time must be before end time', 400);
    }

    const diocese_id = await dioceseModels.find_diocese_by_name(diocese);
    if (!diocese_id) {
        logger.error('Diocese not found');
        throw new CustomError('Diocese not found', 400);
    }


    if (event_level.toLowerCase() !== 'diocesano' && event_level.toLowerCase() !== 'estadual' && event_level.toLowerCase() !== 'grupo_de_oracao') {
        logger.error('Invalid event level');
        throw new CustomError('Invalid event level', 400);
    }

    logger.info('Creating event');
    const creatingEvent = await eventModels.create_event(name, description, location, diocese_id.diocese_id, start_time, end_time, event_level, master_id);
   
    if (!creatingEvent) {
        logger.error('Error creating event');
        throw new CustomError('Error creating event', 400);
    }
    logger.info('Event created successfully');
    return {
        message: 'Event created successfully',
        event: {
            id: creatingEvent.event_id,
            name: creatingEvent.name,
            description: creatingEvent.description,
            location: creatingEvent.location,
            diocese_id: creatingEvent.diocese_id,
            start_time: creatingEvent.start_time,
            end_time: creatingEvent.end_time,
            event_level: creatingEvent.event_level,
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
 

export default {
    create_event,
    find_All_events,
}